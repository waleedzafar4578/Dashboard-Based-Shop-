import React from "react";
import "../style/AppLayout.css";
interface LayoutProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  sider?: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ header, content, footer, sider }) => {
  return (
    <div className="app-layout">
      {header && <header className="app-header">{header}</header>}

      <div className="app-main">
        {sider && <aside className="app-sider">{sider}</aside>}
        <main className="app-content">{content}</main>
      </div>

      {footer && <footer className="app-footer">{footer}</footer>}
    </div>
  );
};

export default AppLayout;



