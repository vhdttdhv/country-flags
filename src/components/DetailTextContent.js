import React from "react";

function DetailTextContent(props) {
  return (
    <div className="detail-text-childen">
      <strong>{props.strong}: </strong>
      {props.text}
    </div>
  );
}

export default DetailTextContent;
