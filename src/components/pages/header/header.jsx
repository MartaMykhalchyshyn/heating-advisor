import React from "react"
import { Popover, Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import Navigation from "@components/pages/navigation/navigation"

import "./header.sass"


const Header = () => {

    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    const text = <span>{window.localStorage.getItem("user-email")}</span>
    const content = (
        <div>
            <p onClick={logout} style={{ cursor: "pointer", marginBottom: 0 }}>Logout</p>
        </div>
    )

    return (
        <div className="header">
            <Navigation />
            <div className="header-icon">
                <Popover placement="bottomRight" title={text} content={content} trigger="click">
                    <Avatar size={64} style={{ margin: "20px", cursor: "pointer" }} icon={<UserOutlined />} />
                </Popover>
            </div>
        </div>
    )
}

export default Header
