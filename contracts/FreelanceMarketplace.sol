// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceMarketplace {
    struct Job {
        uint id;
        string title;
        string description;
        address payable freelancer;
        uint payment;
        bool completed;
    }

    uint public jobCount = 0;
    mapping(uint => Job) public jobs;

    function createJob(string memory _title, string memory _description, uint _payment) public {
        jobCount++;
        jobs[jobCount] = Job(jobCount, _title, _description, payable(msg.sender), _payment, false);
    }

    function completeJob(uint _jobId) public {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.freelancer, "Only the assigned freelancer can complete this job");
        require(!job.completed, "Job already completed");
        job.completed = true;
        job.freelancer.transfer(job.payment);
    }
}
