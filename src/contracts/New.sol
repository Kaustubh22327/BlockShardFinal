// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract New {
    mapping(address => bytes32[]) public fileOwners;
    mapping(bytes32 => mapping(address => bool)) public accessControl;
    mapping(address => bytes32[])internal sharedFiles;
    function add(bytes32 _hash) external{
        fileOwners[msg.sender].push(_hash);
    }
    function fetch(address _user, bytes32 _hash) private view returns(uint){
        for(uint i=0;i<fileOwners[msg.sender].length;i++) {
            if(sharedFiles[_user][i] == _hash)
            return (i+1);
        }
        return 0;
    }
    function check(address _user, bytes32 _hash) private view returns(bool) {
        for(uint i=0;i<fileOwners[msg.sender].length;i++) {
            if(fileOwners[_user][i] == _hash)
            return true;
        }
        return false;
    }
    function allow(address _user,bytes32 _hash) external{
        require(check(msg.sender,_hash),"You don't have access");
        accessControl[_hash][_user] = true;
        sharedFiles[_user].push(_hash);
    }
    function disallow(address _user,bytes32 _hash) external{
        require(check(msg.sender,_hash),"You don't have access");
        accessControl[_hash][_user] = false;
        if(fetch(_user, _hash)!=0)
        sharedFiles[_user][fetch(_user, _hash)-1] = "" ;
    }
    function display() external view returns(bytes32[] memory){
        return fileOwners[msg.sender];
    }
    function getSharedFiles() external view returns(bytes32[] memory) {
        return sharedFiles[msg.sender];
    }
}