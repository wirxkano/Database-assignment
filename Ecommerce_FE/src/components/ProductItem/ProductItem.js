import React from 'react';
import Card from '@mui/material/Card';
import styles from './ProductItem.style';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Rating from '@mui/material/Rating';
import { icons } from '../../constant';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

//redux & api
import { useDispatch } from 'react-redux';

const ProductItem = ({ product, isSlider }) => {
	const formatedPrice = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(product.price);
	const productURL =
		'/product/' +
		encodeURIComponent(product.name).replace(/%20/g, '-') +
		`?i=${product.productID}`;

	return (
		<Link to={productURL} style={styles.link}>
			<Card sx={isSlider ? styles.cardSlider : styles.card}>
				<Box sx={styles.box}>
					<CardMedia
						component="img"
						height="200"
						image={product.img1}
						alt="product image"
						sx={styles.pImage}
					/>
					<CardContent sx={styles.pNameWrapper}>
						<Typography sx={isSlider ? styles.pNameSlider : styles.pName}>
							{product.name}
						</Typography>
					</CardContent>
					<Box style={styles.pRatingWrapper}>
						<Rating
							size="small"
							readOnly
							value={product.rating}
							precision={0.5}
							sx={
								isSlider ? styles.pRatingSlider : styles.pRating
							}
						/>
						<Typography sx={isSlider ? styles.pSoldSlider : styles.pSold}>
							({product.sold})
						</Typography>
					</Box>
					<CardActions sx={styles.cardBottom}>
						<Typography sx={isSlider ? styles.pPriceSlider : styles.pPrice}>
							{formatedPrice}
						</Typography>
					</CardActions>
				</Box>
			</Card>
		</Link>
	);
};

export default ProductItem;
