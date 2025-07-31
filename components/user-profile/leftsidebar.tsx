import { FaGithub as Github, FaLinkedin as Linkedin, FaTwitter as Twitter } from "react-icons/fa";


// function StatRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <span className="text-blue-500">{icon}</span>
//         <span className="text-gray-300 text-sm">{label}</span>
//       </div>
//       <span className="text-white font-semibold">{value}</span>
//     </div>
//   );
// }

function SocialLink({ href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 hover:border-gray-600"
    >
      <Icon className="w-4 h-4 text-gray-300" />
    </a>
  );
}



export default function LeftSidebar({ user }) {
  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Profile Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-700"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white mb-1">{user.fullname}</h1>
            <p className="text-gray-400 text-sm mb-2">{user.username}</p>
            <div className="text-sm text-gray-300 mb-3">
              Rank <span className="font-semibold text-white">{user.stats.ranking.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span>📍</span>
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span>🎓</span>
            <span>{user.institute}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-5">
          <SocialLink href={user.social.github} icon={Github} />
          <SocialLink href={user.social.linkedin} icon={Linkedin} />
          <SocialLink href={user.social.twitter} icon={Twitter} />
        </div>
      </div>

      {/* Community Stats
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Community Stats</h3>
        <div className="space-y-4">
          <StatRow icon="👀" label="Views" value="0" />
          <StatRow icon="💡" label="Solution" value="0" />
          <StatRow icon="💬" label="Discuss" value="0" />
          <StatRow icon="⭐" label="Reputation" value="0" />
        </div>
      </div> */}

      {/* Languages */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
        <div className="space-y-3">
          {user.languages.map((lang) => (
            <div key={lang.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${lang.color}`}></div>
                <span className="text-gray-300">{lang.name}</span>
              </div>
              <span className="text-gray-400 text-sm">{lang.solved} problems solved</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
    <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
    <div className="space-y-4">
        {user.skills.map((skillGroup) => (
        <div key={skillGroup.level}>
            <div className="text-gray-200 font-medium mb-1">{skillGroup.level}</div>
            <div className="flex flex-wrap gap-2">
            {skillGroup.topics.map((topic) => (
                <span
                key={topic}
                className="text-sm text-gray-300 bg-gray-800 border border-gray-700 px-2 py-1 rounded-md"
                >
                {topic}
                </span>
            ))}
            </div>
        </div>
        ))}
    </div>
    </div>

    </div>
  );
}

