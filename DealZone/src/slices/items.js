import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [
		{
			id: 1,
			name: "32oz Motivational Sports Water Bottle with Time Marker",
			price: 15,
			description: "Staying hydrated is often easier said than done. With the Sahara Sailor clear water bottle and its time reminder, you can now not only track your daily water intake at ease, but also encourage you to drink enough water. This water bottle holds 32oz / 1 Liter, which is the adequate amount to aid your daily hydration routine and it is light to carry.",
			images: ["https://m.media-amazon.com/images/I/61h8Dgf8NxL._AC_SX679_.jpg", "https://m.media-amazon.com/images/I/413EbAq83yL._AC_US100_.jpg",
				"https://m.media-amazon.com/images/I/41r+YPg5xSL._AC_US100_.jpg", "https://m.media-amazon.com/images/I/41mOMlNGZpL._AC_US100_.jpg"
			]
		},
		{
			id: 2, name: "Desk Fan", price: 25,
			description: " Feel the power 30ft (9.14 m) away! Powerful and focused, designed to circulate the air throughout the whole room. Great for year-round use with a heat source to circulate warm air in wintertime and with an A/C to circulate cool air in summer time.",
			images: ["https://m.media-amazon.com/images/I/616abARWT1L._AC_SX679_.jpg", "https://m.media-amazon.com/images/I/51t498vUGRL._AC_US100_.jpg",
				"https://m.media-amazon.com/images/I/41JP4qH01sL._AC_US100_.jpg", "https://m.media-amazon.com/images/I/51Re6lMHUIL._AC_US100_.jpg"
			]
		}
	]
}

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {}
});

export default itemsSlice.reducer;
