import { Grid, Typography, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import '../../styles/footer.css'
// import Bgfooter from "../assets/image/footer-bg.jpg";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


function Footer() {
    return (
        <div>
            <Grid container sx={{ color: "#abb7c4" }} p={10} mt={4} className="bg-footer">
                <Grid item md={4} sm={6} xs={12} mb={4}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: "#fff" }}>Baby Store</Typography>
                    <Typography variant="body1" mt={1}>Clothes</Typography>
                    <Typography variant="body1" mt={1}>Hoang Le</Typography>
                    <Typography variant="body1" mt={1}>call Us: (+84) 822103199</Typography>
                </Grid>

                <Grid item md={2} sm={6} xs={12} mb={4}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>Resources</Typography>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> About CinemyPlex</Typography>
                    </Link>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> Contact Us </Typography>
                    </Link>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> Forums </Typography>
                    </Link>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> Blog </Typography>
                    </Link>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> Help Center </Typography>
                    </Link>
                </Grid>

                <Grid item md={2} sm={6} xs={12} mb={4}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>Legal</Typography>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> Terms of Use</Typography>
                    </Link>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> Privacy Policy </Typography>
                    </Link>
                    <Link to="#" style={{ color: "#abb7c4" }}>
                        <Typography variant="body2" mt={1}> Security </Typography>
                    </Link>
                </Grid>

                <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>Newsletter</Typography>
                    <Typography variant="body1">Subscribe to our newsletter system now to get latest news from us</Typography>
                    <Grid item xs={12} mt={2}>
                        <TextField placeholder="Enter your email" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} />
                    </Grid>
                    <Link to="#" style={{ color: "red", textDecoration: "none" }} >
                        <Typography mt={2} variant="h6" fontWeight={700}> SUBSCRIBE NOW</Typography>
                    </Link>
                </Grid>
            </Grid>

            <Grid container p={2} style={{ backgroundColor: "#16162e", color: "#abb7c4" }}>
                <Grid item xs={6}>
                    <Typography variant="body2">
                        © 2022 CinemyPlex. All Rights Reserved. Designed by <Link to="#">Hoang Le</Link>.
                    </Typography>
                </Grid>

                <Grid item xs={6} textAlign="right">
                    <Link to="#" style={{ color: "#abb7c4", textDecoration: "none" }}>
                        <Typography variant="body1" fontWeight={700} className="backTop">
                            Quay lên trên <ArrowUpwardIcon />
                        </Typography>
                    </Link>
                </Grid>
            </Grid >
        </div >
    )
}

export default Footer;