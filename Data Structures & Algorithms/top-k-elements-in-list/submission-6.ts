class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    //
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

        // O(n) time
        const buckets = []
        for(let i = 0; i<= nums.length; i++) {
            buckets.push([])
        }

        // O(m) & m<=n so O(n)
        for (const [key, value] of map.entries()) {
            buckets[value].push(key);
        }

        const result = [];

        // O(n) time
        for (let i = buckets.length; i >= 0 && k > 0; i--) {
            if (buckets[i] && buckets[i].length > 0) {
                if (buckets[i].length <= k) {
                    result.push(...buckets[i]);
                    k -= buckets[i].length;
                } else {
                    result.push(...buckets[i].slice(0, k));
                    k = 0; 
                }
            }
        }
        return result;
    }
}
