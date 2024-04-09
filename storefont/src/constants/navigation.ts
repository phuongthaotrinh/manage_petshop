
import {type MainNavItem, type SidebarNavItem, Navigation} from "@/types"

export interface NavbarConfig {
    authNav: SidebarNavItem[],
    homeNav: MainNavItem[],
    services:any[],
    services2:any[],
    brands:any[],
    adminNav:Navigation[]
    adminStoreMenu:any[],
    adminProductNCate:any[]
}

export const navigationConfig: NavbarConfig = {
    authNav: [
        {
            title: "Profile",
            href: "/account/profile",
            icon: "avatar",
            items: [],
        },
        {
            title: "Notifications",
            href: "/account/notifications",
            icon: "notifications",
            items: [],
        },
        {
            title: "Groups",
            href: "/account/groups",
            icon: "layout_grid",
            items: [],
        },
    ],
    homeNav: [
        {
            title: "Trang chủ",
            href: "/",
        },
        {
            title: "Giới thiệu",
            href: "/work",
        },
        {
            title: "Sản phẩm",
            href: "/about",
        },
        {
            title: "Dịch vụ",
            href: "/contact",
        },
        {
            title: "Cẩm nang",
            href: "/contact",
        },
        {
            title: "Đặt lịch ngay",
            href: "/#booking",
            isSpecial: true
        },
    ],
    services:[
        {
            image: 'services-1.png',
            title: 'Đặt Hàng Online',
            desc:'Giao hàng hỏa tốc, nội thành trong 2 tiếng'
        },
        {
            image: 'services-2.png',
            title: 'Cắt Tỉa & Spa',
            desc:'Với quy trình 10 bước cắt tỉa, tạo kiểu cùng những thợ groomer hàng đầu.'
        },
        {
            image: 'services-3.png',
            title: 'Khách Sạn & Lưu Chuồng',
            desc:'Chăm sóc và bảo vệ bé cún, mèo của bạn 24/7'
        },
        {
            image: 'service-5-new.png',
            title: 'Bác Sĩ Thú Y',
            desc:'Khám chữa bệnh với các thiết bị hiện đại'
        },
    ],
    services2:[
        {
            title:'KHÁCH SẠN THÚ CƯNG',
            data:[
                "Giúp thú cưng sạch sẽ hơn, gọn gàng hơn",
                "Tạo những kiểu tóc sang chảnh, ấn tượng",
                "Loại bỏ các mầm mống gây bệnh từ lông móng",
                "Thú cưng được massage đúng cách, tạo tâm lý vui vẻ, thoải mái",
                "Đảm bảo an toàn cho boss"
            ],
            isImage:false,
            bg:"services-bg-1.png",
            icon:"services-title.png"
        },
        {
            isImage: true,
            image:"banner_service.png"
        },
        {
            title:'THÚ Y - KHÁM CHỮA BỆNH',
            data:[
                "Ngăn ngừa và sớm phát hiện các bệnh nguy hiểm",
                "Kiểm soát được tình trạng mất cân bằng dinh dưỡng",
                "Phát hiện bệnh từ những dấu hiệu ban đầu và điều trị dứt điểm",
                "Tiết kiệm chi phí và thời gian điều trị cho thú cưng",
                "Phòng ngừa các bệnh lây từ thú sang người"
            ],
            isImage:false,
            bg:"services-bg-2.png",
            icon:"services-title-2.png"
        }

    ],
    brands:[
        "brand_1.png",
        "brand_2.png",
        "brand_3.png",
        "brand_4.png",
        "brand_5.png",
        "brand_6.png",
    ],
    adminNav:[
        {
            title: "Setting",
            icon: "SettingsIcon",
            items:[
                {
                    title: "Sliders",
                    href:"/admin/sliders",
                    icon:"ImageIcon"
                },
                {
                    title: "Categories",
                    href:"/admin/categories",
                    icon:"Grid2X2",
                    items:[
                        {
                            title: "Create",
                            href:"/admin/sliders/create",
                            icon:"PlusCircle"
                        },
                    ]
                },
                {
                    title: "Brands",
                    href:"/admin/brands",
                    icon:"Tags"
                },
                {
                    title: "Pets",
                    href:"/admin/pets",
                    icon: "PawPrint"
                },
                {
                    title: "News",
                    href:"/admin/news",
                    icon:"Tags"
                },
                {
                    title: "Store",
                    href:"/admin/store/info",
                    icon:"Store"
                },
            ]
        },
        {
            title: "Services",
            href:"/admin/services",
            icon:"UserRound"
        },
        {
            title: "Analytics",
            icon: "PieChart",
        },
        {
            title: "Schedule",
            href:"/admin/schedule",
            icon:"CalendarCheck"
        },
        {
            title: "Products",
            href:"/admin/products",
            icon: "Package",
        },
        {
            title: "Payment",
            href:"/admin/payment",
            icon:"Wallet"
        },
        {
            title: "Customers",
            href:"/admin/customers",
            icon:"UserRound"
        },
        {
            title: "Discount",
            href:"/admin/discount",
            icon:"Ticket"
        },

    ],
    adminStoreMenu: [
        {
            title:"Info",
            href:"/admin/store/info",
            icon:"Info"
        },
        {
            title:"Payment",
            href:"/admin/store/payment",
            icon:"Store"
        }
    ],
    adminProductNCate:[
        {
            title:"Brands",
            href:"/admin/products/brand&cate/brands",
            icon:"TagsIcon"
        },
        {
            title:"Categories",
            href:"/admin/products/brand&cate/categories",
            icon:"layout_grid"
        },
        {
            title:"Products",
            href:"/admin/products/products",
            icon:"Package"
        },
    ],

}