import React from "react";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";

const AuthorLoading = () => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="160px" height="300px" borderRadius="8px" />
                </div>
                <div className="nft__item_wrap"></div>
                <div className="nft__item_info">
                  <Link to="">
                    <h4>
                      <Skeleton
                        width="100px"
                        height="10px"
                        borderRadius="8px"
                      />
                    </h4>
                  </Link>
                  <div className="nft__item_price">
                    <Skeleton width="200px" height="10px" borderRadius="8px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorLoading;
