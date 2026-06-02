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

        // O(m) time and space  m <=n -> O(n) 
        const arr = new Array(...map);
        // O(mlogm) time m <=n -> O(nlogn)
        arr.sort((a, b) => b[1] - a[1]);

        let result = [];

        // O(k) time
        for (let i = 0; i < k; i++) {
            result.push(arr[i][0]);
        }
        return result;
    }
}
