// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract ElectoralDistrict {
    
    address private districtOwner;
    string[] private candidatesName;
    string[] private voters;
    // Stores name of candidate and his vote count.
    mapping(string=> int256) private candidateVoteCount;
    // Stores hashed SSN of eligible voters.
    mapping(string=> bool) private eligibleVoters;

    constructor(string[] memory _eligibleVoters, string[] memory _candidates) {
        // Init eligible voters for district
        for(uint i=0;i<_eligibleVoters.length;i++) {
            eligibleVoters[_eligibleVoters[i]] = false;
        }
        voters = _eligibleVoters;
        districtOwner = msg.sender;
        //Init candidates 
        for(uint i=0;i<_candidates.length;i++) {
            candidateVoteCount[_candidates[i]] = 0;
        }
        candidatesName = _candidates;
    }

    function vote(string memory hashedSSN, string memory candidate) public {
        require(eligibleVoters[hashedSSN] != true, "Voter has already voted!");
        require(isValidVoter(hashedSSN), "Voter is not from this district!");
        require(isValidCandidate(candidate), "Candidate is not registered in this campaign!");
        candidateVoteCount[candidate] = candidateVoteCount[candidate]+1;
        eligibleVoters[hashedSSN] = true;
    }

    function getDistrictWinner(string memory candidate) public view returns(int256) {
        /*int256 totalVotes=0;
        int256 winnerVotes=0;
        string memory candidateWinner;
        for(uint i=0;i<candidatesName.length;i++) {
            totalVotes += candidateVoteCount[candidatesName[i]];
            if(winnerVotes < candidateVoteCount[candidatesName[i]]) {
                winnerVotes = candidateVoteCount[candidatesName[i]];
                candidateWinner = candidatesName[i];
            }
        }*/
        
         return (candidateVoteCount[candidate]);
    }

    function getDistrictCandidate(string memory candidate) public view returns(string memory, int256) {
        require(isValidCandidate(candidate), "Candidate is not registered in this campaign!");
        return (candidate, candidateVoteCount[candidate]);
    }

    function getDistrictCandidates() public view returns(string[] memory) {
        return candidatesName;
    }

    function isValidCandidate(string memory candidate) private view returns(bool) {
        for(uint i=0;i<candidatesName.length;i++) {
            if(keccak256(bytes(candidatesName[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }

        return false;
    }

    function isValidVoter(string memory voter) private view returns(bool) {
        for(uint i=0;i<voters.length;i++) {
            if(keccak256(bytes(voters[i])) == keccak256(bytes(voter))) {
                return true;
            }
        }

        return false;
    }

}