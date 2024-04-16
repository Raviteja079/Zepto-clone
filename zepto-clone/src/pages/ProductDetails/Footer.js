import React from "react";
import classes from "./Footer.module.css"
import { Link } from "react-router-dom";
import zeptoLogo from "../../assets/Footer/logo.svg";
import instagram from "../../assets/Footer/instagram.svg";
import twitter from "../../assets/Footer/twitter.svg";
import facebook from "../../assets/Footer/facebook.svg";
import linkedIn from "../../assets/Footer/linkedin.svg";
import playStore from "../../assets/Footer/play-store.svg";
import appStore from "../../assets/Footer/app-store.svg";
import { useFirebase } from "../../firebase/firebase";


const Footer = () => {
    
    const {allCategoriesList} = useFirebase()

  return (
    <div className={classes["footer-container"]}>
      <div className="m-2">
        <h4 className={classes["categories-heading"]}>Categories</h4>
        <div>
          <ul className={classes["categories-unordered-list"]}>
            {allCategoriesList &&
              allCategoriesList.map((each) => (
                <li className={classes["category-list-item"]}>
                  <Link
                    className={classes["category-links"]}
                    to={`/sub-category/${each.id}/1`}
                  >
                    {each.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <hr className={classes["hr-line"]} />
      <div className="mt-5 d-flex">
        <div className={classes["social-media-ac-container"]}>
          <div className={classes["social-media-ac"]}>
            <img
              className={classes["zepto-logo"]}
              src={zeptoLogo}
              alt="zepto-logo"
            />
            <div className="d-flex">
              <a href="https://www.instagram.com/zeptonow/">
                <img
                  src={instagram}
                  className={classes["social-media-icon"]}
                  alt="instagram"
                />
              </a>
              <a href="https://twitter.com/ZeptoNow">
                <img
                  src={twitter}
                  className={classes["social-media-icon"]}
                  alt="twitter"
                />
              </a>
              <a href="https://www.facebook.com/Zeptonow/">
                <img
                  src={facebook}
                  className={classes["social-media-icon"]}
                  alt="facebook"
                />
              </a>
              <a href="https://www.linkedin.com/company/zeptonow/">
                <img
                  src={linkedIn}
                  className={classes["social-media-icon"]}
                  alt="linkedIn"
                />
              </a>
            </div>
          </div>
          <p className={classes["company-name"]}>
            © KiranaKart Technologies Private Limited
          </p>
        </div>
        <div className={classes["external-links-container"]}>
          <div className="d-flex flex-column w-100">
            <Link to="/" className={classes["external-links"]}>
              <p>Home</p>
            </Link>
            <a
              href="https://www.zeptonow.com/del-areas"
              className={classes["external-links"]}
            >
              <p>Delivery Areas</p>
            </a>
            <a
              href="https://zeptonow.openings.co/#!/"
              className={classes["external-links"]}
            >
              <p>Careers</p>
            </a>
            <a
              href="https://www.zeptonow.com/customer-support"
              className={classes["external-links"]}
            >
              <p>Customer Support</p>
            </a>
            <a
              href="https://www.zeptonow.com/press"
              className={classes["external-links"]}
            >
              <p>Press</p>
            </a>
          </div>
          <div className="d-flex flex-column w-100">
            <a
              href="https://www.zeptonow.com/privacy-policy"
              className={classes["external-links"]}
            >
              <p>Privacy Policy</p>
            </a>
            <a
              href="https://www.zeptonow.com/terms-of-service"
              className={classes["external-links"]}
            >
              <p>Terms of Use</p>
            </a>
            <a
              href="https://www.zeptonow.com/responsible-disclosure-policy"
              className={classes["external-links"]}
            >
              <p>Responsible Disclosure Policy</p>
            </a>
            <a
              href="https://blog.zeptonow.com/"
              className={classes["external-links"]}
            >
              <p>Mojo - a Zepto Blog</p>
            </a>
          </div>
        </div>
        <div className="">
          <p>Download now</p>
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.zeptoconsumerapp&pli=1"
              className={classes["download-btn"]}
            >
              <img
                src={playStore}
                className={classes["app-icon"]}
                alt="playstore"
              />
              <p className={classes["button-text"]}>Get it on Playstore</p>
            </a>
            <a
              href="https://apps.apple.com/in/app/zepto-10-min-grocery-delivery/id1575323645"
              className={classes["download-btn"]}
            >
              <img
                src={appStore}
                className={classes["app-icon"]}
                alt="playstore"
              />
              <p className={classes["button-text"]}>Get it on Playstore</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
