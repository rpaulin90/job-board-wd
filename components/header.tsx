import React from "react";
import Link from "next/link";
import { Menu, Dropdown } from 'semantic-ui-react'

const Header = () => {

    const aStyle = {
        display: "block",
        width: "12rem",
        height: "100%",
        margin: "0"
    };

  return (
    <>
        <Menu secondary>
            <Menu.Item
                name='home'
            >
                <Link href={"/"}>

                    <a className="text-xs">
                        <img style={{border: 'none', width: '4rem'}} src="https://www.freelogodesign.org/file/app/client/thumb/1f71dc93-0280-4228-a314-37dffe857761_200x200.png?1587526268159" alt="Pinguino" />
                    </a>

                </Link>
            </Menu.Item>
            <Menu.Item
                name='resources'
            >

                <Menu vertical secondary style={{border: 'solid', width: 'auto'}}>
                    <Dropdown style={{margin: 0}} item text='More'>
                        <Dropdown.Menu style={{backgroundColor: 'floralwhite'}}>
                            <Dropdown.Item>
                                <a href="#" className="text-xs">
                                    Resources
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a target="blank" href={"https://www.notion.so/8ede35f6132148b68a4de3f08ceba3dc?v=21553b3e1b34421cb763bb04eecd2a34"} className="text-xs">
                                    Blog
                                </a>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
            </Menu.Item>

            <Menu.Item
                name='post_job'
                position='right'
            >
                <Link href={"jobs/post_job"}>
                    <a style={aStyle} className={'post_button'}>
                        [ Post a Job ]
                    </a>
                </Link>
                {/*<Link href={"/login"}>*/}
                    {/*<a style={{float: 'right'}}>[ log in ]</a>*/}
                {/*</Link>*/}
            </Menu.Item>
        </Menu>
      {/*<div>*/}
          {/*<div>*/}
              {/*<Link href={"/"}>*/}

                  {/*<a className="text-xs">*/}
                      {/*<img style={{border: 'none', width: '4rem'}} src="https://www.freelogodesign.org/file/app/client/thumb/1f71dc93-0280-4228-a314-37dffe857761_200x200.png?1587526268159" alt="Pinguino" />*/}
                  {/*</a>*/}

              {/*</Link>*/}
              {/*<Link href={"../pages/jobs/post_job"}>*/}
                  {/*<a style={aStyle} className={'post_button'}>*/}
                      {/*[ Post a Job ]*/}
                  {/*</a>*/}
              {/*</Link>*/}
              {/*<Link href={"/login"}>*/}
                  {/*<a style={{float: 'right'}}>[ log in ]</a>*/}
              {/*</Link>*/}
          {/*</div>*/}
      {/*</div>*/}
    </>
  );
};

export default Header;
