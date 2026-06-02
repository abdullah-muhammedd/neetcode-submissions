interface HeapPair<K> {
  key: K;
  value: number; // The heap will sort based on this number
}

class MinHeapPairs<K> {
  private heap: HeapPair<K>[] = [];

  peek(): HeapPair<K> | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  insert(key: K, value: number): void {
    this.heap.push({ key, value });
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin(): HeapPair<K> | null {
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
      if (this.heap[index].value >= this.heap[parentIndex].value) break;

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
      if (leftChildIndex < length && this.heap[leftChildIndex].value < this.heap[largest].value) {
        largest = leftChildIndex;
      }

      if (rightChildIndex < length && this.heap[rightChildIndex].value < this.heap[largest].value) {
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

        const heap = new MinHeapPairs<number>()

        // O(m) time &  m<=n -> O(n)
        const arr = new Array(...map);

        // O(mlogK) time  &  m<=n -> O(nlogk)
        for(let i = 0; i < arr.length; i++){
            /**
             * Original Max-Heap (\(O(N \log N)\)):
             * You insert all 1,000,000 items. 
             * As the heap grows, the tree becomes 20 levels deep 
             * (\(\log_2(1,000,000) \approx 20\)). 
             * Every time you insert a number, 
             * it has to complete up to 20 comparison steps to bubble up.
             * \(\text{Total\ operations}\approx 1,000,000\times 20=\mathbf{20,000,000}\text{\ operations}\)
             * The Capped Min-Heap (\(O(N \log K)\)):You still loop 1,000,000 times, 
             * but because you evict the minimum element immediately, 
             * the heap size never exceeds 11. A tree of size 11 is only 3 levels deep 
             * (\(\log_2(11) \approx 3.4\)). Every insertion only takes up to 3 comparison steps 
             * to bubble up.\(\text{Total\ operations}\approx 1,000,000\times 
             * 3.4=\mathbf{3,400,000}\text{\ operations}\)
             */
            heap.insert(arr[i][0] , arr[i][1])
            if(heap.size() > k){
                heap.extractMin()
            }
        }

        let result = [];
        // O(klogk)
        while (heap.size() > 0) {
            result.push(heap.extractMin().key);
        }
        return result;
    }
}