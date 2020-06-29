export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      name: 'Admin',
      url: '/',
      icon: 'icon-bell',
      children: [
        {
          name: 'Admin Register',
          url: '/admin-register',
          icon: 'icon-bell',
        },
        {
          name: 'All Admins',
          url: '/all-admins',
          icon: 'icon-bell',
        },
        {
          name: 'Search By ID',
          url: '/get-admin-by-id/',
          icon: 'icon-bell',
        },
        {
          name: 'Search By Name',
          url: '/search-admin',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'User',
      url: '/',
      icon: 'icon-bell',
      children: [
        {
          name: 'User Register',
          url: '/user-register',
          icon: 'icon-bell',
        },
        {
          name: 'All Users',
          url: '/all-users',
          icon: 'icon-bell',
        },
        {
          name: 'Search By ID',
          url: '/get-user-by-id/',
          icon: 'icon-bell',
        },
        {
          name: 'Search By Name',
          url: '/search-user',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Category',
      url: '/',
      icon: 'icon-star',
      children: [
        {
          name: 'Add Category',
          url: '/add-category',
          icon: 'icon-star',
        },
        {
          name: 'All Categories',
          url: '/all-categories',
          icon: 'icon-star',
        },
        {
          name: 'Search By ID',
          url: '/get-category-by-id/',
          icon: 'icon-star',
        },
        {
          name: 'Search By Name',
          url: '/search-category',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'SubCategory',
      url: '/',
      icon: 'icon-star',
      children: [
        {
          name: 'Add SubCategory',
          url: '/add-subcategory',
          icon: 'icon-star',
        },
        {
          name: 'All SubCategories',
          url: '/get-all-subcategories/',
          icon: 'icon-star',
        }
      ],
    },
    {
      name: 'Product',
      url: '/',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Add Product',
          url: '/add-product',
          icon: 'icon-cursor',
        },
        {
          name: 'All Products',
          url: '/all-products',
          icon: 'icon-cursor',
        },
        {
          name: 'Search By ID',
          url: '/get-product-by-id/',
          icon: 'icon-cursor',
        },
        {
          name: 'Search By Name',
          url: '/search-product',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Orders',
      url: '/',
      icon: 'icon-cursor',
      children: [
        {
          name: 'All Orders',
          url: '/all-orders',
          icon: 'icon-cursor',
        },
        {
          name: 'Search By User ID',
          url: '/get-order-by-user-id/',
          icon: 'icon-cursor',
        },
        {
          name: 'Search By Order ID',
          url: '/get-order-by-order-id/',
          icon: 'icon-cursor',
        }
      ],
    },
  ],
};
