import { getMenuItemFromURL } from "@/component/helpers/menu";
import IconifyIcon from "@/component/wrapper/IconifyIcon";
import clsx from "clsx";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
const MenuItemWithChildren = ({
  item,
  className,
  linkClassName,
  activeMenuItems,
  toggleMenu
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isInitiallyOpen = activeMenuItems?.includes(item.key);
  const [open, setOpen] = useState(isInitiallyOpen);
  const [wasUserToggled, setWasUserToggled] = useState(false);
  const hasActiveChild = useCallback(() => {
    const checkChildren = children => {
      return children.some(child => {
        if (child.url === pathname) return true;
        if (child.children) return checkChildren(child.children);
        return false;
      });
    };
    return item.children ? checkChildren(item.children) : false;
  }, [item.children, pathname]);
  const isChildActive = hasActiveChild();
  const isParentActive = item.url === pathname;
  useEffect(() => {
    const shouldBeOpen = activeMenuItems?.includes(item.key);
    if (!wasUserToggled || shouldBeOpen !== open) {
      setOpen(shouldBeOpen || false);
      if (shouldBeOpen !== open) {
        setWasUserToggled(false);
      }
    }
  }, [activeMenuItems, item.key, open, wasUserToggled]);
  const toggleMenuItem = () => {
    const newStatus = !open;
    setOpen(newStatus);
    setWasUserToggled(true);
    if (toggleMenu) toggleMenu(item, newStatus);
  };
  const isActive = activeMenuItems?.includes(item.key);
  const shouldHighlightParent = isActive || isChildActive || isParentActive;
  return <li className={clsx(className, {
    "menuitem-active": shouldHighlightParent,
    active: shouldHighlightParent
  })}>
      <a onClick={e => {
      e.preventDefault();
      toggleMenuItem();
    }} className={clsx(linkClassName, {
      active: open || shouldHighlightParent
    })} aria-expanded={open}>
        {item.icon && <i data-feather={item.icon.replace("feather:", "")}></i>}
        <span>{item.label}</span>
        <span className="menu-arrow" style={{
        display: "inline-block",
        transition: "transform 0.3s ease",
        transform: open ? "rotate(90deg)" : "rotate(0deg)"
      }}>
          <IconifyIcon icon="mdi:chevron-right" />
        </span>
      </a>
      <Collapse in={open}>
        <ul className="nav-second-level">
          {item.children?.map((child, idx) => <Fragment key={idx}>
              {child.children ? <MenuItemWithChildren item={child} activeMenuItems={activeMenuItems} className="menuitem-active" toggleMenu={toggleMenu} /> : <MenuItem item={child} linkClassName="tp-link" />}
            </Fragment>)}
        </ul>
      </Collapse>
    </li>;
};
const MenuItem = ({
  item,
  className,
  linkClassName
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = item.url === pathname;
  return <li className={clsx(className, {
    "menuitem-active": isActive,
    active: isActive
  })}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>;
};
const MenuItemLink = ({
  item,
  className
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = item.url === pathname;
  return <Link to={item.url ?? "#"} className={clsx(className, {
    active: isActive
  })}>
      {item.icon && <i data-feather={item.icon.replace("feather:", "")}></i>}
      <span>{item.label}</span>
    </Link>;
};
const findParentMenuItem = (menuItems, targetKey) => {
  for (const item of menuItems) {
    if (item.children) {
      for (const child of item.children) {
        if (child.key === targetKey) {
          return item;
        }
        if (child.children) {
          const found = findParentMenuItem([child], targetKey);
          if (found) return item;
        }
      }
    }
  }
  return null;
};
const AppMenu = ({
  menuItems
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeMenuItems, setActiveMenuItems] = useState([]);
  const toggleMenu = (menuItem, show) => {
    if (show) {
      setActiveMenuItems([menuItem.key]);
    } else {
      setActiveMenuItems(prev => prev.filter(key => key !== menuItem.key));
    }
  };
  const activeMenu = useCallback(() => {
    const trimmedURL = pathname;
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);
    if (matchingMenuItem) {
      const parentMenuItem = findParentMenuItem(menuItems, matchingMenuItem.key);
      if (parentMenuItem) {
        setActiveMenuItems([parentMenuItem.key]);
      } else {
        setActiveMenuItems([]);
      }
    } else {
      setActiveMenuItems([]);
    }
  }, [pathname, menuItems]);
  useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      activeMenu();
    }
  }, [activeMenu, menuItems]);
  return <ul id="side-menu">
      {menuItems.map((item, idx) => <Fragment key={item.key + idx}>
          {item.isTitle ? <li className={clsx("menu-title", {
        "mt-2": idx !== 0
      })}>{item.label}</li> : item.children ? <MenuItemWithChildren item={item} toggleMenu={toggleMenu} linkClassName="nav-link" activeMenuItems={activeMenuItems} /> : <MenuItem item={item} linkClassName="tp-link" />}
        </Fragment>)}
    </ul>;
};
export default AppMenu;