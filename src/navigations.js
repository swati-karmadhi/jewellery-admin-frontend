import { pageRoutes } from "./constants/routesList";

export const navigations = [
	{ name: "Dashboard", path: pageRoutes.dashboard, icon: "dashboard" },
	{ label: "Inventory", type: "label" },
	{ name: "Diamonds", path: pageRoutes.diamond, icon: "diamond" },
	{ name: "Jewellery", path: pageRoutes.jewellery, icon: "diversity_2" },
	{ name: "Customer", path: pageRoutes.customer, icon: "person" },
	{ label: "Masters", type: "label" },
	{
		name: "Diamond",
		icon: "diamond",
		children: [
			{ name: "Lab", iconText: "LB", path: pageRoutes.master.diamond.lab },
			{ name: "Shape", iconText: "SP", path: pageRoutes.master.diamond.shape },
		],
	},
	{
		name: "Jewellery",
		icon: "diversity_2",
		children: [
			{ name: "Category", iconText: "CT", path: pageRoutes.master.jewellery.category },
			{ name: "Subcategory", iconText: "SC", path: pageRoutes.master.jewellery.subcategory },
			{ name: "Options", iconText: "OP", path: pageRoutes.master.jewellery.options },
			{ name: "Attributes", iconText: "AT", path: pageRoutes.master.jewellery.attributes },
			{ name: "Details Group", iconText: "DG", path: pageRoutes.master.jewellery.detailsGroup },
			{ name: "Details", iconText: "DG", path: pageRoutes.master.jewellery.details },
		],
	},
	{
		name: "User",
		icon: "account_circle",
		children: [
			{ name: "Permissions", iconText: "CT", path: pageRoutes.master.user.permissions },
			{ name: "User", iconText: "CT", path: pageRoutes.master.user.user },
		],
	},
];
