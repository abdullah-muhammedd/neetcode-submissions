interface HeapPair<K> {
  key: K;
  value: number; // The heap will sort based on this number
}

class MaxHeapPairs<K> {
  private heap: HeapPair<K>[] = [];

  peek(): HeapPair<K> | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  insert(key: K, value: number): void {
    this.heap.push({ key, value });
    this.heapifyUp(this.heap.length - 1);
  }

  extractMax(): HeapPair<K> | null {
    if (this.heap.length === 0) return null;
    
    const max = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0 && end !== undefined) {
      this.heap[0] = end;
      this.heapifyDown(0);
    }

    return max;
  }

  size(): number {
    return this.heap.length;
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      // Compare the numeric value properties
      if (this.heap[index].value <= this.heap[parentIndex].value) break;

      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private heapifyDown(index: number): void {
    const length = this.heap.length;
    
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let largest = index;

      // Compare the numeric value properties
      if (leftChildIndex < length && this.heap[leftChildIndex].value > this.heap[largest].value) {
        largest = leftChildIndex;
      }

      if (rightChildIndex < length && this.heap[rightChildIndex].value > this.heap[largest].value) {
        largest = rightChildIndex;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }
}
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    //O(n) space & O(nlogn) time
    topKFrequent(nums: number[], k: number): number[] {
        // O(n) space
        const map = new Map();

        // O(n) time
        for (let i = 0; i < nums.length; i++) {
            if (!map.has(nums[i])) {
                map.set(nums[i], 0);
            }
            map.set(nums[i], map.get(nums[i]) + 1);
        }

        const heap = new MaxHeapPairs<number>()

        // O(m) time &  m<=n -> O(n)
        const arr = new Array(...map);
        // O(mlogm) time  &  m<=n -> O(nlogn)
        for(let i = 0; i < arr.length; i++){
            heap.insert(arr[i][0] , arr[i][1])
        }

        let result = [];
        // O(klogm) time  m<=n -> O(klogn)
        for (let i = 0; i < k; i++) {
            result.push(heap.extractMax().key);
        }
        return result;
    }
}
