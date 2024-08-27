import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AuthorLoading from "../components/author/AuthorLoading";

const Author = () => {
  const [author, setAuthor] = useState({});
  const { id } = useParams();
  const [authorItems, setAuthorItems] = useState([]);
  const [loading, setLoading] = useState();
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState();

  async function fetchAuthor() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setAuthorItems(data.nftCollection);
    setFollowers(data.followers);
    setLoading(false);
  }

  useEffect(() => {
    fetchAuthor();
    window.scrollTo(0, 0);
  }, []);

  function follow() {
    if (!followed) {
      setFollowed(true);
      setFollowers(followers + 1);
    } else {
      setFollowed(false);
      setFollowers(followers - 1);
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div
            data-aos="zoom-in-up"
            data-aos-delay="100"
            data-aos-duration="4000"
            data-aos-easing="ease-in-out"
          >
            <div className="container">
              <div className="row">
                {!loading && Object.keys(author).length > 0 ? (
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {followers} followers
                          </div>
                          <Link to="#" className="btn-main" onClick={follow}>
                            {!followed ? "Follow" : "Unfollow"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width="150px"
                            height="150px"
                            borderRadius="50%"
                          />
                          <div className="profile_name">
                            <h4>
                              <Skeleton width="200px" borderRadius="8px" />
                              <span className="profile_username">
                                <Skeleton width="100px" borderRadius="8px" />
                              </span>

                              <Skeleton width="300px" borderRadius="8px" />
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <Skeleton
                            width="150px"
                            height="40px"
                            borderRadius="8px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    {!loading ? (
                      <AuthorItems authorItems={authorItems} author={author} />
                    ) : (
                      <AuthorLoading></AuthorLoading>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
