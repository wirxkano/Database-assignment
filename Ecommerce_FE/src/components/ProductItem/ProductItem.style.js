const styles = {
	link: {
		textDecoration: 'none',
	},
	card: {
		maxWidth: 345,
		minHeight: {
			xs: "280px",
			md: "320px",
		},
		borderRadius: '25px',
		boxShadow: 'none',
		padding: {
			lg: '.9rem',
			xs: '0rem .5rem .5rem .5rem',
		},
	},
	cardSlider: {
		maxWidth: 345,
		minHeight: {
			xs: "280px",
			md: "320px",
		},
		borderRadius: '25px',
		boxShadow: 'none',
		marginRight: {
			xs: 0,
			md: '25px',
		},
		padding: {
			lg: '.9rem',
			xs: '0rem 1.1rem 1.1rem 1.1rem',
		},
	},
	box: {
		'&:hover': {
			transition: 'transform 0.3s ease-in-out',
			transform: 'scale(1.03)',
			backgroundColor: 'white',
		},
	},
	pImage: {
		height: {
			xs: "170px",
			md: "200px",
		},
		objectFit: 'contain',
	},
	pNameWrapper: {
		minHeight:"50px",
		padding: {
			xs: '0px 10px',
			lg: '10px',
		},
	},
	pName: {
		margin: 0,
		fontSize: {
			xs: '14px',
			lg: '15px',
		},
		fontWeight: '500',
		lineHeight: "20px",
		textOverflow: "ellipsis",
        display: "-webkit-box",
        overflow: "hidden",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
	},
	pNameSlider: {
		margin: 0,
		fontSize: '15px',
		fontWeight: '500',
		lineHeight: "20px",
		textOverflow: "ellipsis",
        display: "-webkit-box",
        overflow: "hidden",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",

	},
	pRatingWrapper: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: '10px',
	},
	pRating: {
		fontSize: {
			xs: '15px',
			lg: '16px',
		},
	},
	pRatingSlider: {
		fontSize: '17px',
	},
	pSold: {
		fontSize: {
			xs: '11px',
			lg: '12px',
		},
		marginLeft: '4px',
		alignSelf: 'center',
	},
	pSoldSlider: {
		fontSize: '12px',
		marginLeft: '4px',
	},
	cardBottom: {
		marginTop: '5px',
		padding: '0px 0px 0px 10px',
	},
	pPrice: {
		fontSize: {
			xs: '15px',
			lg: '16px',
		},
		fontWeight: '600',
	},
	pPriceSlider: {
		fontSize: '16px',
		fontWeight: '600',
	},
};

export default styles;
