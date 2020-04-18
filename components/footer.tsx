import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <p style={{position: 'fixed', left: 0, bottom: 0, width: '100%', textAlign: 'center'}}>
      <Link href={"/about"}>
        <a className="text-xs">[ about ]</a>
      </Link>
      <Link href={"/terms"}>
        <a className="text-xs">[ terms ]</a>
      </Link>
    </p>
  );
};

export default Footer;
