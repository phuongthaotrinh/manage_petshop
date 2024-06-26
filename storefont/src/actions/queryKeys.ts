export enum QUERY_KEYS {
    // POST KEYS
    GET_POSTS = "getPosts",
    GET_INFINITE_POSTS = "getInfinitePosts",
    GET_RECENT_POSTS = "getRecentPosts",
    GET_POST_BY_ID = "getPostById",
    DELETE_POST = "post/deletePost",
    UPDATE_POST="post/updatePost",
    GET_FILE_PREVIEW = "getFilePreview",

    //  PETS KEYS
    PETS_GET_PETS= "pets/getPets",

    //PETS_WEIGHT
    PETS_WEIGHT__GET_PETS= "petWeight/getPetWeight",

    //SERVICES
    SERVICES__GET_ALL= "services/getAllServices",
    SERVICES__GET_DETAIL_BY_ID= "services/getDetailById",
    SERVICES__CREATE= "services/createService",
    SERVICES__SET_SERVICE_PRICE_F0R_PET= "services/setServicePriceOfPet",
    SERVICES__UPDATE_SERVICE_PRICE_F0R_PET= "services/updateServicePriceOfPet",
    SERVICES__GET_ALL_SERVICE_OF_PETS="services/getServiceOfPet",
    SERVICES__GET_SERVICE_OF_ALL_PETS="services/getAllServiceOfAllPet",
    SERVICES__DELETE= "services/delete",

    //USERS
    CUSTOMERS_GET_ALL = "customers/getAllCustomers",

    //STORE
    STORE_CREATE = "store/create",
    STORE_GET_STORE = "store/getDetail",
    STORE_UPDATE_STORE = "store/update",


    //BRANDS
    BRANDS_CREATE = "brands/create",
    BRANDS_GET_ALL="brands/getAllBrands",
    BRANDS_GET_DETAIL="brands/getDetailBrand",
    BRANDS_UPDATE = "brands/update",
    BRANDS_DELETE = "brands/delete",

    //CATEGORIES
    CATEGORIES_CREATE = "categories/create",
    CATEGORIES_GET_ALL="categories/getAllCategories",
    CATEGORIES_GET_DETAIL="categories/getDetailCategories",
    CATEGORIES_UPDATE = "categories/update",
    CATEGORIES_DELETE = "categories/delete",

    //COMBO_SERVICE
    SERVICES_COMBO__CREATE="comboService/create",
    SERVICES_COMBO__GET_ALL="comboService/getAllComboService",




    //PRODUCT
    PRODUCT__CREATE = "products/create",
    PRODUCT__GET_ALL = "products/getAllProducts",
    PRODUCT__GET_DETAIL = "products/getAllProducts",

    GET_SHIPPING_FEE ="shipping/getFee",



    //discount
    DISCOUNT_VOUCHER_ALL = "discount/get-all",
    DISCOUNT_VOUCHER_REMOVE = "discount/remove",
    DISCOUNT_VOUCHER_CREATE = "discount/create",
    DISCOUNT_VOUCHER_DETAIL = "discount/get-detail",


    //schedule
    SCHEDULE_GET_ALL= "schedule/get-all",
    SCHEDULE_BOOKING= "schedule/book",

    //role
    PERMISSIONS_GET_ALL='permissions/get-all',

    ROLE_CREATE='role/create',
    ROLE_GET_ALL ='roles/get-all',
    ROLE_DELETE='roles/delete'

}