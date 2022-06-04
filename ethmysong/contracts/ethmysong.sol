// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract ETH_my_Song {
    string public name = "ETH_my_Song";

    // Store Audios
    mapping(uint256 => Audio) public Audios;
    uint256 public AudioCount = 0;

    struct Audio {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable author;
        string cover_image;
    }

    event AudioCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author,
        string cover_image
    );

    event AudioTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    // Create an Audio
    function uploadAudio(string memory _imgHash, string memory _description, string memory cover_image)
        public
    {
        require(bytes(_imgHash).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0x0));

        AudioCount++;
        Audios[AudioCount] = Audio(
            AudioCount,
            _imgHash,
            _description,
            0,
            payable(msg.sender),
            cover_image
        );
        emit AudioCreated(AudioCount, _imgHash, _description, 0, payable(msg.sender), cover_image);
    }

    function tipAudioOwner(uint256 _id) public payable {
        require(_id > 0 && _id <= AudioCount);
        Audio memory _Audio = Audios[_id];
        address payable _author = _Audio.author;
        payable(_author).transfer(msg.value);

        _Audio.tipAmount = _Audio.tipAmount + msg.value;
        Audios[_id] = _Audio;

        emit AudioTipped(
            _id,
            _Audio.hash,
            _Audio.description,
            _Audio.tipAmount,
            _author
        );
    }    
}