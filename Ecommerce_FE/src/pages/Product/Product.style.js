import { colors } from '../../constant';

const styles = {
	nextArrow: {
		position: 'absolute',
		padding: 0,
		right: {
			xs: '10px',
			lg: '100px',
		},
		top: '45%',
		zIndex: '1000',
	},
	prevArrow: {
		position: 'absolute',
		padding: 0,
		left: {
			xs: '10px',
			lg: '100px',
		},
		top: '45%',
		zIndex: '1000',
	},
	box: {
		paddingTop: '40px',
		bgcolor: 'rgb(245, 245, 245)',
	},
	productContainer: {
		position: "relative",
		minHeight: '80vh',
		bgcolor: 'white',
		borderRadius: '15px',
		padding: {
			xs: '40px 20px',
			lg: '60px 80px',
		},
	},
	image: {
		height: {
			xs: '400px',
			lg: '480px',
		},
		width: '100%',
		objectFit: 'contain',
		margin: 0,
	},
	imgSkeleton: {
		bgcolor: 'rgb(245, 245, 245)',
		borderRadius: '15px',
		boxShadow: 'none',
		height: {
			xs: '350px',
			lg: '500px',
		},
		width: '500px !important',
		marginLeft: {
			xs: 0,
			lg: '100px',
		},
	},
	skeletonColor: {
		bgcolor: 'rgb(245, 245, 245)',
	},
	wrapper: {
		mt: {
			xs: 5,
			lg: 0,
		},
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	boxWrapper: {
		width: '100%',
	},
	pName: {
		textAlign: 'center',
		fontSize: {
			xs: '24px',
			lg: '29px',
		},
		fontWeight: 'bold',
		paddingRight: 0,
	},
	pRatingWrapper: {
		display: 'flex',
		justifyContent: 'center',
		mt: 2,
	},
	pRating: {
		fontSize: {
			xs: '15px',
			lg: '19px',
		},
	},
	pSold: {
		fontSize: {
			xs: '13px',
			lg: '14px',
		},
		marginLeft: '5px',
		alignSelf: 'center',
	},
	priceWrapper: {
		mt: 5,
	},
	dividerWrapper: {
		display: 'flex',
		justifyContent: 'center',
	},
	divider: {
		height: '3px',
		width: '40px',
		border: 'none',
		borderRadius: '100px',
		color: 'black',
		backgroundColor: 'black',
	},
	pPrice: {
		textAlign: 'center',
		fontSize: {
			xs: '18px',
			lg: '20px',
		},
		fontWeight: 'bold',
		mt: 2,
	},
	btnWrapper: {
		marginTop: '70px',
		display: 'flex',
		justifyContent: 'center',
	},
	favoriteBtn: {
		padding: {
			xs: '10px 15px',
			lg: '12px 20px',
		},
		color: 'black',
		border: 'none',
		marginRight: {
			xs: '20px',
			lg: '60px',
		},
		textTransform: 'none',
		fontSize: {
			xs: "14px",
			lg: "16px",
		},
		'&:hover': {
			border: 'none',
			bgcolor: '#efefef',
		},
		minWidth: {
			xs: "170px",
			lg: "200px",
		},
	},
	addBtn: {
		bgcolor: colors.primary,
		padding: {
			xs: '10px 15px',
			lg: '12px 20px',
		},
		fontSize: {
			xs: "14px",
			lg: "16px",
		},
		textTransform: 'none',
		'&:hover': {
			bgcolor: '#525252',
		},
	},
	boxDesc: {
		bgcolor: 'rgb(245, 245, 245)',
		padding: '100px 0px',
	},
	detailContainer: {
		marginTop: '40px',
		minHeight: '40vh',
		bgcolor: 'white',
		borderRadius: '15px',
		padding: {
			xs: '20px',
			lg: '30px',
		},
	},
	tabListWrapper: {
		display: 'flex',
		justifyContent: 'center',
		mb: {
			xs: 0,
			lg: 3,
		},
	},
	tabTitle: {
		margin: {
			xs: '0 15px',
			lg: '0 70px',
		},
		textTransform: 'none',
		color: 'black',
		fontWeight: 'bold',
		fontSize: {
			xs: '16px',
			lg: '19px',
		},
	},
	details: {
		whiteSpace: 'pre-line',
		fontSize: {
			xs: '15px',
			md: '17px',
		},
		lineHeight: 2,
		fontWeight: 300,
		textAlign: 'center',
		padding: 0,
		wordBreak: 'break-word',
	},
	relatedProductContainer: {
		marginTop: '60px',
		paddingBottom: '80px',
	},
	sliderTitle: {
		fontSize: {
			xs: '20px',
			md: '27px',
		},
		fontWeight: 'bold',
		marginBottom: 0,
	},
	boxCenter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	skeletonButton: {
		bgcolor: 'rgb(245, 245, 245)',
		marginRight: '30px',
		marginLeft: '30px',
	},
	skeletonTab: {
		bgcolor: 'rgb(245, 245, 245)',
		marginRight: '50px',
		marginLeft: '50px',
	},
	skeletonTitle: {
		bgcolor: '#ededed',
		mb: 4,
	},

	relatedProductWrapper: {
		display: "flex",
		marginBottom: '25px',
		alignItems: "center",
	},

	link: {
		textDecoration: 'none',
		margin: 'auto 27px auto auto',
	},

	viewMoreBtn: {
		textTransform: 'none',
		color: 'black',
	},
	modal: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 'fit-content',
		bgcolor: "white",
		borderRadius:"8px",
		boxShadow: 24,
		p: 4,
	},

	deleteBtn: {
        backgroundColor: "red",
        color: "white",
        textTransform: "none",
        px: 2,
        py: 1,
        mx: {
            xs: 1,
            md: 5,
        },
        "&: hover": {
            backgroundColor: "#b90000",
        },
	},
	editBtn: {
		backgroundColor: "#333333",
        color: "white",
        textTransform: "none",
        px: 2,
        py: 1,
        mx: {
            xs: 1,
            md: 5,
        },
        "&: hover": {
            bgcolor: '#525252',
        },
	},
	adminWrapper: {
		position: "absolute",
		top: 8,
		right: 8,
	},

	adminBtn: {
		color: "#333333",
	},

	menu: {
		padding: "0 6px",
	},

	adminMenu: {
		borderRadius: "25px",
		my: 0.5,
	},

	adminBtnWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	adminIcon: {
		fontSize: "22px",
		mr: 1,
	},

	adminText: {
		fontSize: "18px",
	}
};

export default styles;
