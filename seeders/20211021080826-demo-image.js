'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        id: 1,
        product_id: 1,
        src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
        alt: '男裝素色圓領短袖T恤_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        product_id: 2,
        src: 'https://images.pexels.com/photos/5432147/pexels-photo-5432147.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        alt: '女裝長版翻領風衣外套_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        product_id: 3,
        src: 'https://images.unsplash.com/photo-1588189408846-30ad110a0f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXx5WmdnU0FkSlBGY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
        alt: '女裝雙排扣格紋西裝外套_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        product_id: 4,
        src: 'https://images.unsplash.com/photo-1624378407998-48becabd8c27?ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDd8eVpnZ1NBZEpQRmN8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '男裝圓領針織衫',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        product_id: 5,
        src: 'https://images.unsplash.com/photo-1516271099866-de31ba93ee4b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
        alt: '男裝 SLIM FIT 刷破牛仔褲_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        product_id: 6,
        src: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2tpcnR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '女裝蝴蝶結綁帶西裝短裙_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        product_id: 7,
        src: 'https://images.unsplash.com/photo-1559010012-ce7447422d91?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU1fHxoYXR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '女裝綾織棉質漁夫帽_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        product_id: 8,
        src: 'https://images.pexels.com/photos/234575/pexels-photo-234575.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        alt: '女裝內刷毛防風背心_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        product_id: 9,
        src: 'https://images.pexels.com/photos/4398944/pexels-photo-4398944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        alt: '男裝長版毛呢大衣_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        product_id: 10,
        src: 'https://images.unsplash.com/photo-1636016954413-44070ee44f8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
        alt: '男裝經典直筒牛仔褲_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        product_id: 11,
        src: 'https://images.unsplash.com/photo-1632803199971-ee777136da2f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c3dlYXRzaGlydHxlbnwwfDJ8Mnx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '男裝LOGO休閒連帽上衣_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        product_id: 12,
        src: 'https://images.unsplash.com/photo-1632084904795-9f2eb9340618?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3dlYXRzaGlydHxlbnwwfDJ8Mnx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '女裝落肩寬版短上衣_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        product_id: 13,
        src: 'https://images.unsplash.com/photo-1592961659807-88f71d4acd3f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTF8fHNoaXJ0c3xlbnwwfDJ8Mnx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '男裝 SLIM FIT鈕扣領條紋襯衫_01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
