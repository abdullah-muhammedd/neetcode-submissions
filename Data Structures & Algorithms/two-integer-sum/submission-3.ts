class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums: number[], target: number): number[] {
        let map = new Map();
        for(let i =0 ; i< nums.length ; i++){
            if(map.has(nums[i]))
                continue;
            map.set(nums[i] , i);
        }
        for(let i =0 ; i< nums.length ; i++){
            const n2 = target-nums[i];
            if(map.has(n2)){
                const j = map.get(n2)
                if(i === j) continue;
                return [i , j]
            }
        }
    }
}
