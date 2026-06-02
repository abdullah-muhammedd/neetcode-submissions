class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums: number[], target: number): number[] {
        let map = new Map();
        for(let i =0 ; i< nums.length ; i++){
            const searchKey = target - nums[i];
            if(map.has(searchKey)){
                return [i , map.get(searchKey)]
            }
            map.set(nums[i] , i);
        }
    }
}
