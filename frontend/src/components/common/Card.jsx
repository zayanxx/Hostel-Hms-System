import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={classNames(
        "bg-white rounded-2xl shadow-md border border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
