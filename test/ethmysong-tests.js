const { assert } = require("chai");

const ETH_my_Song = artifacts.require("./ETH_my_Song.sol");

require("chai").use(require("chai-as-promised")).should();

contract("ETH_my_Song", ([deployer, author, donator]) => {
  let eTH_my_Song;
  before(async () => {
    eTH_my_Song = await ETH_my_Song.deployed();
  });

  describe("deployment", () => {
    it("should be an instance of ETH_my_Song", async () => {
      const address = await ETH_my_Song.address;
      assert.notEqual(address, null);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, undefined);
    });
  });

  describe("Audios", () => {
    let result;
    const hash = "abcd1234";
    const description = "This is a test Audio";
    let AudioCount;
    before(async () => {
      result = await 
      eTH_my_Song.uploadAudio(hash, description, {
        from: author,
      });
      AudioCount = await eTH_my_Song.AudioCount();
    });

    it("Check Audio", async () => {
      let Audio = await eTH_my_Song.Audios(1);
      assert.equal(AudioCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.hash, hash);
      assert.equal(event.description, description);
    });

    it("Allow users to donate", async () => {
      let oldAuthorBalance;
      oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);
      result = await eTH_my_Song.tipAudioOwner(AudioCount, {
        from: donator,
        value: web3.utils.toWei("1", "Ether"),
      });

      const event = result.logs[0].args;
      let newAuthorBalance;
      newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance);

      let tipAudioOwner;
      tipAudioOwner = web3.utils.toWei("1", "Ether");
      tipAudioOwner = new web3.utils.BN(tipAudioOwner);

      const expectedBalance = oldAuthorBalance.add(tipAudioOwner);
      assert.equal(newAuthorBalance.toString(), expectedBalance.toString());
    });
  });
});