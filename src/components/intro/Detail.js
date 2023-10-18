import { useState } from "react";
import Bio from "./Bio";

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  rel,
}) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div>
      <div className="add_details_flex " onClick={() => setShowDetail(true)}>
        {value ? (
          <div className="info_profile ">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {showDetail && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShowDetail={setShowDetail}
          rel={rel}
        />
      )}
    </div>
  );
}