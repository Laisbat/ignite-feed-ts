import { Avatar } from "./Avatar";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      />

      <div className={styles.profile}>
        <Avatar
          hasBorder
          src="https://avatars.githubusercontent.com/u/20651268?v=4"
        />
        <strong>Laís Batista</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">Editar seu PERFIIIIIIL</a>
      </footer>
    </aside>
  );
}
