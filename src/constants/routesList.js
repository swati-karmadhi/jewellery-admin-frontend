export const apiEndPoint = {
	login: "login",
	lab: "lab",
	shape: "shape",
	productDetailsGroup: "productDetailsGroup",
	productDetails: "productDetails",
	category: "category",
	subcategory: "subcategory",
    options:"options",
    attributes:"attributes",
    permission:"permission",
    user:"user",
    userPermission:"userPermission",
};

export const pageRoutes = {
	general: {
		login: "signin",
		signup: "signup",
		forgotPassword: "forgot_password",
		error: "404",
	},
	dashboard: "/dashboard/default",
	diamond: "/diamonds",
	jewellery: "/jewellery",
	customer: "/customer",
	master: {
		diamond: {
			lab: "/master/diamond/lab",
			shape: "/master/diamond/shape",
		},
		jewellery: {
			category: "/master/jewellery/category",
			subcategory: "/master/jewellery/subcategory",
			options: "/master/jewellery/options",
			attributes: "/master/jewellery/attributes",
			detailsGroup: "/master/jewellery/details_group",
			details: "/master/jewellery/details",
		},
		user: {
			permissions: "/master/user/permissions",
			user: "/master/user/user",
			userPermissions: "/master/user/user_permissions/:id",
		},
	},
};
