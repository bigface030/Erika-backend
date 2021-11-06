'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        id: 1,
        product_id: 1,
        src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
        alt: '男裝素色圓領短袖T恤',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        product_id: 2,
        src: 'https://images.pexels.com/photos/5432147/pexels-photo-5432147.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        alt: '女裝長版翻領風衣外套',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        product_id: 3,
        src: 'https://images.unsplash.com/photo-1588189408846-30ad110a0f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXx5WmdnU0FkSlBGY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
        alt: '女裝雙排扣格紋西裝外套',
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
        alt: '男裝 SLIM FIT 刷破牛仔褲',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        product_id: 6,
        src: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2tpcnR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '女裝蝴蝶結綁帶西裝短裙',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        product_id: 7,
        src: 'https://images.unsplash.com/photo-1559010012-ce7447422d91?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTU1fHxoYXR8ZW58MHwyfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        alt: '女裝綾織棉質漁夫帽',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
