module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserCurrency', [
      {
        userId: 1,
        currencyId: 3,
        balance: "0",
        private: {"version":3,"id":"f3415bbd-fbeb-4bea-9b15-7b9a7d14eea8","address":"818e72162b985d9ccc6054804215a74edb622a35","crypto":{"ciphertext":"36732befe29be9720a11133a03602f2cebddb7db072587348f63caf6255a7730","cipherparams":{"iv":"673c2a5a5ecc969194a7f6c98ea5e879"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"69b05beffc7ced2d7004b170dccec81a97b8dee43ebb61842ebc5572fcb25eb0","n":8192,"r":8,"p":1},"mac":"2b2c1c60f2d0b48e7a5124cf0f44dfe02e4b21b9f547f783f9a18b0649601783"},"encryptedPrivate2":"7c68ef553b06c42f070b0e53948b5469bce2a42666498ec1aab602c814459bb4d2fcdfe13df5aa9c34e9a5525d79a81a5643fd314ce34c33c59f8ad8af7a766ece66ece48c462f35e6c3b2cb56c681f6"},
        address: '0x818e72162B985D9cCC6054804215a74eDB622a35',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 5,
        balance: "0",
        private: {"version":3,"id":"f395912c-e139-4c2d-a6f8-f3308261927b","address":"38ff9bcbd83213897198a1f7e380322382dd9362","crypto":{"ciphertext":"d9e1a27044b0a4002c566a9521140209798055c1f6b1187b87c887483c0f7a58","cipherparams":{"iv":"d75fc2d3e31aa0d8dac4588be921b3bb"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"92b389c37e687f08789e09242baa12f7b4df8668b0348da09ffd32ae77b5ee28","n":8192,"r":8,"p":1},"mac":"e5d5c9dd9377d4ebd100d6aadd8233410237dd90ab9463ef21ee923346e5e1b8"},"encryptedPrivate2":"6e5bc4af0cb49c70f023ec08da65d923950848607ad54c443ea8e40f6c92c1e093f7bbfdde0130ac1ad6d42559611ed8f3a42b82b0108b525aeb56980f2afdf9a456480316ab6271c27863960b35e0fa"},
        address: '0x38ff9BcBD83213897198a1f7E380322382DD9362',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 7,
        balance: "0",
        private: {"private":"568bc555530cd16e9ecae305dd357ced1ad779a640089978664f4a922d742e3da70721db41323075bb7853f3712907a0334dab495e8e3eca163c80901fd56ec17515987af52c4c00135f696cf1f3e5f8","public":"51245c20f4007f72dbb4a08bc58ef3416862137d9228e295749973e17461fd22034bd02d60b3ff6de8e82f59bddfbe3226da9c87043a40d6bc706be9c6256f0be034df98f6c069deef4d61b9480d3477","wif":"1d4ece8947ea44b5368c346d320abaadaffef026d1903eef65f855e272d3bc1c9834f7eee585df4d3a0e5899bb900ce0585df8be1f9412230e84fd8cf0c0eae6","private2":"974ff325c6f88d5cc7ad371b6894bd6500c356806b53f603b4c624400104a210dc0e5700f59a7186eae1da473e84cdeb549e129a360a990a6f7abb1e3ed0d4864dd437591b6d073624ff875469b2c828","public2":"f87a675f9c8307a936faa34eb251664580e85f7898f1ded8f920dbba0f52d15405867b03d9c1e162335531b77d33d0a586817cfcbe8c1bea657f9cad0cf22bb01d701bb1fc88a5ea8fb54dffcc7cb183","wif2":"18a1251be5e4520441afa98fcbbbb19c1a8d09caa378087e87d6963f5abbdfbc035d14ca7a630a37a034eb496d98fccc2f7de7f38fd4b996d277a6df38c8467a"},
        address: 'Bxf2zp3Bg74VqtUJ3k7ztg2Fk59pmqEfks',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 2,
        balance: "0",
        private: {"version":3,"id":"63815252-5820-498a-9d47-b2f419ec77eb","address":"818e72162b985d9ccc6054804215a74edb622a35","crypto":{"ciphertext":"abdfd43b0e88f05dc5f2f40a3e0f0ae8fcde2afbde788ad7ee3fa48005609364","cipherparams":{"iv":"7a8af11610362892974439eb7c02a593"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"38d88c794e6e19635f14b7493f6a1355fceedbfeb800d14e91b732240b8eb7a4","n":8192,"r":8,"p":1},"mac":"1d7bf0e9b73601913acf2f8682d6fb8d0e52a4e30214c1d6930907443e90af53"},"encryptedPrivate2":"7c68ef553b06c42f070b0e53948b5469bce2a42666498ec1aab602c814459bb4d2fcdfe13df5aa9c34e9a5525d79a81a5643fd314ce34c33c59f8ad8af7a766ece66ece48c462f35e6c3b2cb56c681f6"},
        address: '0x818e72162B985D9cCC6054804215a74eDB622a35',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 9,
        balance: "0",
        private: {"private":"a477260e686a1e2929cefa85f7df2311199714f01cd65040cb4abed567d8eafb5e047d1e3c8cb949ef951ebfa002e1728523769b846995552de3462f8cab93416c2ed529b54a08f86fa23b3630cf953f","private2":"44588f6544b172404caa3dd37ce4e9e2be49fda184a82ba18c684f987b88353596ab80349db54993211dd96d1ff1c0ef80eb111441b6041016388a665fdeaaddce4a56a22fbf63c88b5406dd2b6cc95a"},
        address: '5CATwkRCSU9i2J5aA1kwR8EhHZUxzCGrzuoFh6ydcojpX2y7',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 8,
        balance: "0",
        private: {"private":"31f75050516efc11e57948c244a09effedb33e8b6896019879b09b4b84b14764","private2":"f3a351321cbd72aa199aa47d5c8c99f419ef4b274daf72a8b3daa85563e6d647"},
        address: 'r9Raikw6AXaPE8hLTeDKz5BzhhjnsXG1vL',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 10,
        balance: "0",
        private: {"private":"f7734232617ec9756711d21847e3ecd498b1ea9a773e0e297d6abbec3874b233ff31a21b3c40ef54803435f1756742710e5d97f44588ed4bc0bb809d5e448fe689cd9917d294c6c92e935fe23509eab1ecac4aeaf8d3195fe62817404e5c2ccd","walletId":"87ba17ae8013eb12073e2e2e947729e1442ebdf3","private2":"275a3cdc39bb2593849b0a839786dd5c44ac23e06d430c34131cffa4df0849244d442ef2cf0b8fc63379fd07756c37bbcc67497ddc53bf57b35fc91b1256f0d96384fcfe56b9ae6aaf7399ca27b6e80ef557b5bec50ba8dfefd61546b22e877d"},
        address: 'addr_test1qql90qhhum7jcyhnhpuamu0xsvsph6hl739tdcu4vx3ch7zueypq30ct22xuph9guvjxnfcvcr2nwhsdykvggm3e7x2qrz72n9',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 1,
        balance: "0",
        private: {"version":3,"id":"32723fdb-00b8-44ac-ad60-f1b76050cbee","address":"38ff9bcbd83213897198a1f7e380322382dd9362","crypto":{"ciphertext":"e086cc0511b6e1431f2f2217078d9a08f159004b3750d32321b424e306ca5369","cipherparams":{"iv":"c5cf201aa0392d73b7edba2570f35f79"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"bdd93080cb1020fc3ab2b4e0ecc0ebe9d7acb535d56d86fc22d7450548336810","n":8192,"r":8,"p":1},"mac":"b548539e439f185755520f982c5a6478a27141874d3a3ba3410924146228acbb"},"encryptedPrivate2":"6e5bc4af0cb49c70f023ec08da65d923950848607ad54c443ea8e40f6c92c1e093f7bbfdde0130ac1ad6d42559611ed8f3a42b82b0108b525aeb56980f2afdf9a456480316ab6271c27863960b35e0fa"},
        address: '0x38ff9BcBD83213897198a1f7E380322382DD9362',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 6,
        balance: "0",
        private: {"private":"da403846461a56a4214db31668e2c9b3fe7ae43f495f5213aa0d8a85b7a3106332d72f6dcecd9f2685d7905b15ce2e43b8ed0b13e394f432859ab0995b7de5dc79cbe9881358eb2dcab0686f7356ff31","public":"de8a480026616508f1826d4e9cb735a596082c775065571174c971f57bc344cc7dc4f3793461cac002ebcb4ca5e0b084b34cdda1b6ef482d977556a9416dc02b8484deda2a16c0cffa14d078f86df2f6","wif":"fe40e25cb5693e4390765993d8e65cef2586fe985a01d3f07ce0e67dcf0b4254c45ba6fde1fa0773da38302efb049139e3368ff8eb6f9ad6c91b9fa74028d8ae","private2":"be24dad5ec433352057805b1b0192a6962be8ac364d5d19aea3bba8947384ac661ef7502bd133cac96a58dce9310ac98b1539d60c2d59f452c60547911fbfe2a2bc2488ffccb9b823a7dba943f2af17b","public2":"77da72431c71d0543de1715b8f063df36cdc0f48e0f20a5f627de7bb211b92e5145c4792d13498c6253a28996e98b8d7625e71db987beb6ebb013f17b60a22e7c0a84695d658ce59e9630fb0538a5128","wif2":"029b40c229d5205a824a45148f1b59594cd4a059e5c4f79272068a105935db5170f919035ae184f1a4d006327d7e433d6a8b2e50ffc14a780f2596115f9cd41f"},
        address: 'CCySRaZexh8Gq2HmkKc9RqU9kHJxDHoGxm',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 1,
        currencyId: 4,
        balance: "0",
        private: {"version":3,"id":"bc4f8fda-1836-4380-84a8-feb9047d06c2","address":"38ff9bcbd83213897198a1f7e380322382dd9362","crypto":{"ciphertext":"b18cca4a9b341a0e96bdb0c0743308680ca2c7c833efed6f77d815bb14989c31","cipherparams":{"iv":"3bc88c821656ec4241e65437a4b1cf08"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"47bd9ca0077543b605884b27e230ac233a86877b873a39cca8f72eb6048f1745","n":8192,"r":8,"p":1},"mac":"9e43e6d966f87e14ddb040b6a31f25f5693f91c97f9b6badc2c375c1deb09c0a"},"encryptedPrivate2":"6e5bc4af0cb49c70f023ec08da65d923950848607ad54c443ea8e40f6c92c1e093f7bbfdde0130ac1ad6d42559611ed8f3a42b82b0108b525aeb56980f2afdf9a456480316ab6271c27863960b35e0fa"},
        address: '0x38ff9BcBD83213897198a1f7E380322382DD9362',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 1,
        balance: "0",
        private: {"version":3,"id":"e6570c34-2113-452c-bebd-208ea827c0a4","address":"e2d030c53fe00aa3e2816288da3af25ac1e66862","crypto":{"ciphertext":"9c38647fd851b3d4c280f55e4ce1833778897b93ece87881b16cc30df9545845","cipherparams":{"iv":"a84cf816f0225ad28d36fea2d4d87848"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"d092612590f0ff13ae09d4aab735434ca687004b1a944964582c4e3cf12dd6a1","n":8192,"r":8,"p":1},"mac":"414b51e619f6c4642b920da097f95e0f0055b0e9c4fa1b0196a0df188a8c97c5"},"encryptedPrivate2":"9d6d1682fa9fe5b3de39b0b83cc09c17d3d281a7c1f19c5d87a87faca2475fd1ec4db86010da7c8fd64a724cd9879a0291f395d189fd264c1ae54d9857a9a5d11e37e2a960f96ec3432dcf0edcf9786c"},
        address: '0xE2D030c53fE00Aa3E2816288dA3aF25Ac1e66862',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 2,
        balance: "0",
        private: {"version":3,"id":"ba51666e-482e-4833-b479-d2d742824352","address":"8251e2c9739caadab9383aeb9f6edc9f2374bfed","crypto":{"ciphertext":"6f58953e8eddda6b78d42cf9f7376a8179cd74387e7e296164e96865531af848","cipherparams":{"iv":"bd3dc87085627988bf49ebdef6911137"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"02f49f4ce0b7c7c0fc168762b55d55d718d52d88b7d782aef1da3517ad51d31f","n":8192,"r":8,"p":1},"mac":"1b70d9a81165498eee2832fe3d48994659680b2ad741347bec1ddacdb3b94f4c"},"encryptedPrivate2":"8d773077f57a9b00e725dbeae64fbe00381813877454491b9cd2f8d3dfd301c29fc0c928a6d9f2f97b535160fd2da71f3a6b1ee2c1c24bf0c75971b0d8ea578922ef0449cfad83c0d6addb804241f034"},
        address: '0x8251e2c9739caAdAB9383Aeb9F6eDc9F2374bFeD',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 7,
        balance: "0",
        private: {"private":"aa0d13dd164aba0f1e71b1a30a608831608dc28b9a471534a41337be51f984d9d8e62a44dca1c80aee444eb82e9bc54e61a3285b6199d23a9d1f97580a8a8678c8ed3b264056d3cf8dac74203c544bb0","public":"83124694c959f10110800a3a20d0cbe9e72b8bbcaf5398124466f9b0bb888a01769c969687e5c65e7e2f6279380fb0116c98192890d573ec307fa89af5876fe6dca07546ad4776485b050d9038300a46","wif":"d4c8bc72ae3a756b2b0fbc21cc56d6f8cdd3b859bdc5ee51e266b707cf89d4fd97a464034b7c1599ec16f1d1efba5193c9de8bb9b1313fa7a1ae5eee81bea1d1","private2":"91daf07135ad3f11c83287c940b046fa85227782988ffeb1cc5493c3a0f5e4fc89304a783fc33e048a26f7be6136046f41e1ff3b3f5a443e3a309afd4da1adca6fae3d1d7394f6483f7e07fe152820ad","public2":"4ac9e94db380a1f194a0906a302e45d8e103057d05aff083c1e3b29c97dcad14f52f82463abc89d662763a8a17bd7a5389fd03e65e64c5118f285f782cc8477c74e12cb7414c978e9c3e6f6fba8e2276","wif2":"34cef74e90e71994f37d1a6c4a5b02e14f63300300a0efc5384ea1392d0ba419be52b65f02ff90b5c4f5b427c2e27fb237bff7f6bde458c6e6231655dee68735"},
        address: 'CFRsBMVMTH1VSGb76TaH9rS9J6xKbdhGoP',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 9,
        balance: "0",
        private: {"private":"f7e01197d4c3122b35b88c280998745a4986efae0c687c9ef1b4f56c551b90472290b90b86cd5835dddd0271086eee45c6798b6daadcc56f8b55939c8d60a3eaeb3885bde4084fbdb52613f3beb3f097","private2":"eb6a236b0f0a7e44233224bfc160d8070f606845209350803fa22d1657a2584d8bbcdf2c110b2edfcce0f00efcf03434722c68cffe3098a22fd3e1fd8ef9df53acaf7c819393fb744e67bfb0ed82a0b0"},
        address: '5FKhtmM4DrEemZpqYACVzQurayTGpTkEGG2wskuhADTyeXwY',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 6,
        balance: "0",
        private: {"private":"18e578efc68966c58373e3d25cb609e2d016c52a4b571764ceb206283fa6dedaa9a7f20e484607fb12b7ae148b0db9510744b633e9f8d37a12a3231675c4dff2c29b706e9a15b652e0960df1d86e9cf6","public":"3bbe36bf521e9ad722faea36ddef38da47fa20427ac3f5f562a0268307164e250902f519f90cc809f4e397fb2bb1fca59fb00c3798c97441fb472491bbe2e9dc9deaccdbb94d623195c315ffe3221ba8","wif":"a3a547f515969e7f094a6f8c41d0ccad9834e500c4a88320283839e4b7a08a5ecabd6826bd4b8f2e9b1bccc1e1fda1cb545eeb5d3335d84b4dc81f103cd69fee","private2":"60fe1ed0bd8f5cd503cd4014d02a2ee980022f4dede46f12fef7ddb1c6fa49c482cf67202d423ef6e6a194a519eea27106a1f93146cffdbe31bae3faf808a1ff11ffc9d675f73a248aaad720e5a0b81a","public2":"1979308ce20c2e5f569f347176032ee2d501eae5ff2b19899409cb093184b7ec008307d8f340468b5ae8ce38ea3a8462006c21383c98770d1ef1d5c43979463caac19d672203bb3f6535e57f77742196","wif2":"32a70471cf40fbbd4dfa4da84bcb978883c38680284195405be9d2f0a9be0c6797eb7ee4a85d948566335f21f0f52dd1f745487479813cbfeb11ab18c0eb13a1"},
        address: 'BufAFgo2m8AcGn4y41D4k9bjHydAKnveB8',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 10,
        balance: "0",
        private: {"private":"8bc1aea41c9002ce41978e9964cca8e9c0a17ecbe129d16d9fcbf8b587ba04b54910ae28567aec7af81f35fec041416447c3a48b152603ba25437fc0578a0d12e398d1d9f8eb5947e0b2cea3110ede781093fce2b543f65832b8feffbae7cdb93d777c37c7fa21b162d6988049055b34","walletId":"c7b98b220a6c4a55077bf18961a2a4c67214a96d","private2":"c4a410a793d3ad0837fa69d159defe8e64617644ef528b06ea1dc14e51e19ca44dd96b701b927ec9fd5c82a3c641fdc9e52ae51049633d0a6965421e7e84a988c8b8640a2bdc00774e529071b69a79c152b23e2a2b8d10a2ab8e25083dd5131ab3b04fa28de3620a241419dfe0251c41"},
        address: 'addr_test1qr3reef3q6jewphs9kkepekwkkgy0zapan9pdlwc8whzth72ktlcq6p7d5v84semnml627s7zfashugvfqrlgqkkkhjqjyru5h',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 5,
        balance: "0",
        private: {"version":3,"id":"c57f605a-2e42-490e-affe-128eed236b5d","address":"e2d030c53fe00aa3e2816288da3af25ac1e66862","crypto":{"ciphertext":"6a960a6b4cca5c0e5e6100761466d1b182687b08fbf216fe6c46990c1405a5e1","cipherparams":{"iv":"04987ba98d37ce138a6696bc13a30179"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"c1a69e17663ad857c0a8a8833c1da7083214f0c317dd1dd0d439fb7a183bf388","n":8192,"r":8,"p":1},"mac":"4446de1ad4a8261554410093b709413c9f96a54e83b56dbbd375c054df22bb9e"},"encryptedPrivate2":"9d6d1682fa9fe5b3de39b0b83cc09c17d3d281a7c1f19c5d87a87faca2475fd1ec4db86010da7c8fd64a724cd9879a0291f395d189fd264c1ae54d9857a9a5d11e37e2a960f96ec3432dcf0edcf9786c"},
        address: '0xE2D030c53fE00Aa3E2816288dA3aF25Ac1e66862',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 3,
        balance: "0",
        private: {"version":3,"id":"2c382fb2-db39-4d20-aea0-32c4c595c903","address":"8251e2c9739caadab9383aeb9f6edc9f2374bfed","crypto":{"ciphertext":"08745af984c707da9a533ebf4a3bf748eb3d653d490cad480c905c0902df6bdd","cipherparams":{"iv":"e79070481463de48f0650497b1ddfc69"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"026fab38c89292807b06459a341563a7a5d3d55f183513a5090914f7a8993fb1","n":8192,"r":8,"p":1},"mac":"fa0a6f3d7b110366414773e7325664e05a1a205015b6b03b56c4631d17c8647f"},"encryptedPrivate2":"8d773077f57a9b00e725dbeae64fbe00381813877454491b9cd2f8d3dfd301c29fc0c928a6d9f2f97b535160fd2da71f3a6b1ee2c1c24bf0c75971b0d8ea578922ef0449cfad83c0d6addb804241f034"},
        address: '0x8251e2c9739caAdAB9383Aeb9F6eDc9F2374bFeD',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 8,
        balance: "0",
        private: {"private":"3d506be2ac42403c79af1418e32f0d393d41fd65f1c6a494682f658a221ee551","private2":"37664252e42432d0c57b051546cf5572e3fa74619d7dd8981c7b019e6cbaebac"},
        address: 'rh3s6GfTCvrz82WYLn6DCw9D3N12XZKcat',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        userId: 2,
        currencyId: 4,
        balance: "0",
        private: {"version":3,"id":"efbcf70c-ad75-446b-91e2-0148dde70001","address":"e2d030c53fe00aa3e2816288da3af25ac1e66862","crypto":{"ciphertext":"eca8deed3caa38e2042e61620305c0ad2bac1ba749a05927d22ebe992e546c4b","cipherparams":{"iv":"b49a9a5667a58c9865ebfbe4e2df6446"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"1cc6dd93dfa4d00110bc7574842536d394955db0b242b93470b1b6b8bc79cfc9","n":8192,"r":8,"p":1},"mac":"9997feb42e4fb7eab4f51b4de954341359d8c0740c30dbfb0d76cdcdf1639707"},"encryptedPrivate2":"9d6d1682fa9fe5b3de39b0b83cc09c17d3d281a7c1f19c5d87a87faca2475fd1ec4db86010da7c8fd64a724cd9879a0291f395d189fd264c1ae54d9857a9a5d11e37e2a960f96ec3432dcf0edcf9786c"},
        address: '0xE2D030c53fE00Aa3E2816288dA3aF25Ac1e66862',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {}, {private: { type: new Sequelize.JSON() }});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserCurrency', null, {});
  }
};
