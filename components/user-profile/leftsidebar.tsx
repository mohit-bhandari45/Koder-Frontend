import { Github, Twitter, Linkedin } from "lucide-react";
import User from "@/types/user.types";
import DashboardState from "@/types/dashboard.types";

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

type SocialLinkProps = {
  href: string;
  icon: React.ElementType;
};

function SocialLink({ href, icon: Icon }: SocialLinkProps) {
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


export default function LeftSidebar({ user, dashboard }: { user: User, dashboard: DashboardState }) {
  return (
    <div className="w-full lg:w-80 space-y-6 ">
      {/* Profile Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 min-h-[200px]">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={user.profilepicture}
              alt="profilepicture"
              className="w-16 h-16 rounded-full border-2 border-gray-700"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-white mb-1">{user.fullName}</h1>
            <p className="text-gray-400 text-sm mb-2">{user.username}</p>
            {/* <div className="text-sm text-gray-300 mb-3">
              Rank <span className="font-semibold text-white">{user.stats.ranking.toLocaleString()}</span>
            </div> */}
          </div>
        </div>

        {/* <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span>📍</span>
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span>🎓</span>
            <span>{user.institute}</span>
          </div>
        </div> */}

        {/* <div className="mt-4 flex gap-5">
          <SocialLink href={user.social.github} icon={Github} />
          <SocialLink href={user.social.linkedin} icon={Linkedin} />
          <SocialLink href={user.social.twitter} icon={Twitter} />
        </div> */}
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
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 min-h-[200px]">
        <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
        <div className="space-y-3">
          {Array.isArray(dashboard.languages) && dashboard.languages.length > 0 ? (
            dashboard.languages.map((lang: any) => (
              <div key={lang.language} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300">{lang.language}</span>
                </div>
                <span className="text-gray-400 text-sm">{lang.count} problems solved</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No language stats available yet</p>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 min-h-[200px]">
        <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
        <div className="space-y-4">
          {Object.entries(dashboard.skills).map(([level, skills]) => (
            <div key={level}>
              <div className="text-gray-200 font-medium mb-1">{level}</div>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map(({ skill, count }) => (
                    <span
                      key={skill}
                      className="text-sm text-gray-300 bg-gray-800 border border-gray-700 px-2 py-1 rounded-md"
                    >
                      {skill}{count}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No skills listed yet</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

