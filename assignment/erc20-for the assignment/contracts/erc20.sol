//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

// import "/https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Token is ERC20 {
    address owner;

    modifier onlyOnwer() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() ERC20("Token5", "Tk5") {
        owner = msg.sender;
        _mint(owner, 10000e18);
    }

    function moveToken(address _to, uint256 _amount) public onlyOnwer {
        uint256 currentBal = balanceOf(address(this));

        require(currentBal >= _amount, "Sorry, insufficient balance");
        _transfer(address(this), _to, _amount);
    }
}
