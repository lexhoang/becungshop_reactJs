import './footer.css'
// import Bgfooter from "../assets/image/footer-bg.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark text-white text-footer pt-5 px-sm-3 px-md-5" style={{ marginTop: 90 }}>
                <div className="row mt-5">
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-lg-center p-4" style={{ background: 'rgba(256, 256, 256, 0.05)' }}>
                            <LocationOnIcon fontSize='large' className="me-2 text-footer_color" />
                            <div className="ml-3">
                                <h5 className="fw-bold">Địa Chỉ</h5>
                                <p className="m-0">123 Street, New York, USA</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-lg-center p-4" style={{ background: 'rgba(256, 256, 256, 0.05)' }}>
                            <MailIcon fontSize='large' className="me-2 text-footer_color" />
                            <div className="ml-3">
                                <h5 className="fw-bold">Email Us</h5>
                                <p className="m-0">info@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="d-flex justify-content-lg-center p-4" style={{ background: 'rgba(256, 256, 256, 0.05)' }}>
                            <LocalPhoneIcon fontSize='large' className="me-2 text-footer_color" />
                            <div className="ml-3">
                                <h5 className="fw-bold">Điện Thoại</h5>
                                <p className="m-0">+012 345 6789</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-lg-3 col-md-6 mb-5">
                        <a href="#" className="navbar-brand">
                            <h1 className="m-0 mt-n2 display-4 text-footer_color text-uppercase fw-bold">
                                Chất lượng
                            </h1>
                        </a>
                        <p>
                            Sản phẩm cho trẻ em từ sơ sinh đến 18 tuổi, đa dạng, đặc biệt và chất lượng, giá thành rẻ.
                        </p>
                        <div className="d-flex justify-content-start mt-4">
                            <a className="btn btn-lg btn-outline-light me-2" href="#"><TwitterIcon /></a>
                            <a className="btn btn-lg btn-outline-light me-2" href="#"><FacebookIcon /></a>
                            <a className="btn btn-lg btn-outline-light me-2" href="#"><LinkedInIcon /></a>
                            <a className="btn btn-lg btn-outline-light" href="#"><InstagramIcon /></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="fw-bold text-footer_color mb-4">Liên hệ</h4>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-white mb-2" href="#"><ChevronRightIcon />Trang chủ</a>
                            <a className="text-white mb-2" href="#"><ChevronRightIcon />Xem thêm</a>
                            <a className="text-white mb-2" href="#"><ChevronRightIcon />Dịch vụ</a>
                            <a className="text-white" href="#"><ChevronRightIcon />Liên hệ</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="fw-bold text-footer_color mb-4">Hỗ trợ</h4>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-white mb-2" href="#"><ChevronRightIcon />Lắng nghe</a>
                            <a className="text-white mb-2" href="#"><ChevronRightIcon />Giúp đỡ</a>
                            <a className="text-white mb-2" href="#"><ChevronRightIcon />Điều kiện</a>
                            <a className="text-white mb-2" href="#"><ChevronRightIcon />Sự riêng tư</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="fw-bold text-footer_color mb-4">Phản hồi</h4>
                        <p>
                            Luôn tiếp nhận và phản hồi mọi thắc mắc cũng như yêu cầu của quý khách hàng 1 cách nhanh chóng.
                        </p>
                        <div className="w-100">
                            <div className="input-group">
                                <input type="text" className="form-control border-0" style={{ padding: 20 }} placeholder="Your Email" />
                                <div>
                                    <button className="btn btn-contain" style={{ padding: 20 }}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-4 mt-5 mx-0" style={{ background: 'rgba(256, 256, 256, 0.05)' }}>
                    <div className="col-md-6 text-center">
                        <p className="m-0">
                            © <a className="fw-bold text-footer_color fs-5" href="#">BeCungShop</a>. All
                            Rights Reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-center" />
                </div>
            </div>

        </>
    )
}

export default Footer;