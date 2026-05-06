import "../../styles/ParentProfileSection.css";

export default function ParentProfileSection({ parent }) {
  const initials = (parent?.name || "?")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <section className="pd-profile">
      <div className="pd-profile-avatar">
        {parent?.avatar ? (
          <img src={parent.avatar} alt={parent.name} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <h2 className="pd-profile-name">{parent?.name}</h2>
      {parent?.email && <p className="pd-profile-email">{parent.email}</p>}
    </section>
  );
}

