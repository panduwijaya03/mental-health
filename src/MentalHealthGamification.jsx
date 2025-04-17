import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, Gamepad2, BookOpen, User, Award, Medal } from "lucide-react";

const modules = [
  { id: 1, title: "Pengenalan Kesehatan Mental", description: "Pelajari dasar-dasar kesehatan mental dan pentingnya menjaga keseimbangan emosional.", progress: 50 },
  { id: 2, title: "Manajemen Stres", description: "Strategi dan teknik untuk mengelola stres dalam kehidupan sehari-hari.", progress: 20 },
  { id: 3, title: "Mengenali Depresi", description: "Cara mengenali tanda-tanda awal depresi dan langkah-langkah yang bisa diambil.", progress: 0 },
  { id: 4, title: "Kecemasan dan Cara Mengatasinya", description: "Pahami penyebab kecemasan dan cara-cara efektif untuk mengatasinya.", progress: 0 },
  { id: 5, title: "Kesehatan Mental di Tempat Kerja", description: "Bagaimana menjaga kesehatan mental saat bekerja dan menghadapi tekanan kerja.", progress: 0 },
];

const games = [
  { id: 1, title: "Kuis Kesehatan Mental", description: "Jawab pertanyaan seputar kesehatan mental untuk menguji pengetahuanmu." },
  { id: 2, title: "Puzzle Self-Care", description: "Susun puzzle yang menggambarkan aktivitas self-care untuk meredakan stres." },
  { id: 3, title: "Tebak Emosi", description: "Tebak emosi yang ditampilkan dari ekspresi wajah atau situasi tertentu." },
  { id: 4, title: "Challenge Mindfulness", description: "Ikuti tantangan mindfulness harian untuk melatih fokus dan ketenangan." },
];

const forumPosts = [
  { id: 1, user: "Dian", message: "Bagaimana cara mengatasi overthinking?" },
  { id: 2, user: "Rizky", message: "Apa saja tanda-tanda burnout?" },
];

const leaderboard = [
  { name: "Pandu Wijaya", points: 120 },
  { name: "Dian", points: 80 },
  { name: "Rizky", points: 50 },
];

export default function MentalHealthGamification() {
  const [progress, setProgress] = useState(40);
  const [points, setPoints] = useState(120);
  const [completedModules, setCompletedModules] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [badges, setBadges] = useState([]);

  const completeModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
      setPoints(points + 50);
      checkBadges(points + 50);
    }
  };

  const playGame = (gameId) => {
    if (!playedGames.includes(gameId)) {
      setPlayedGames([...playedGames, gameId]);
      setPoints(points + 30);
      checkBadges(points + 30);
    }
  };

  const checkBadges = (newPoints) => {
    const newBadges = [...badges];
    if (completedModules.length + 1 === modules.length && !badges.includes("Master Educator")) {
      newBadges.push("Master Educator");
    }
    if (newPoints >= 500 && !badges.includes("Mental Health Champion")) {
      newBadges.push("Mental Health Champion");
    }
    setBadges(newBadges);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Edukasi Kesehatan Mental</h1>
      <p className="text-center text-lg text-gray-600 mb-6">
        Pelajari kesehatan mental dengan cara yang interaktif dan menyenangkan!
      </p>

      <Tabs defaultValue="education">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="education"><BookOpen className="w-5 h-5 mr-2" /> Modul Edukasi</TabsTrigger>
          <TabsTrigger value="games"><Gamepad2 className="w-5 h-5 mr-2" /> Game Interaktif</TabsTrigger>
          <TabsTrigger value="forum"><MessageSquare className="w-5 h-5 mr-2" /> Forum</TabsTrigger>
          <TabsTrigger value="profile"><User className="w-5 h-5 mr-2" /> Profil</TabsTrigger>
          <TabsTrigger value="leaderboard"><Medal className="w-5 h-5 mr-2" /> Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="education">
          <Card>
            <CardHeader><CardTitle>Modul Edukasi</CardTitle></CardHeader>
            <CardContent>
              {modules.map((module) => (
                <div key={module.id} className="mb-4">
                  <p className="font-semibold text-lg">{module.title}</p>
                  <p className="text-gray-600 text-sm mb-2">{module.description}</p>
                  <Progress value={completedModules.includes(module.id) ? 100 : module.progress} className="mt-2" />
                  <Button className="mt-2" onClick={() => completeModule(module.id)} disabled={completedModules.includes(module.id)}>
                    {completedModules.includes(module.id) ? "Selesai" : "Lanjut Belajar (Tambah 50 Poin)"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="games">
          <Card>
            <CardHeader><CardTitle>Game Interaktif</CardTitle></CardHeader>
            <CardContent>
              {games.map((game) => (
                <div key={game.id} className="mb-4">
                  <p className="font-semibold text-lg">{game.title}</p>
                  <p className="text-gray-600 text-sm mb-2">{game.description}</p>
                  <Button className="mt-2" onClick={() => playGame(game.id)} disabled={playedGames.includes(game.id)}>
                    {playedGames.includes(game.id) ? "Sudah Dimainkan" : "Mainkan (Tambah 30 Poin)"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forum">
          <Card>
            <CardHeader><CardTitle>Forum & Komunitas</CardTitle></CardHeader>
            <CardContent>
              {forumPosts.map((post) => (
                <div key={post.id} className="mb-4 p-3 border rounded-lg">
                  <p><strong>{post.user}:</strong> {post.message}</p>
                  <Button variant="outline" className="mt-2">Balas</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle>Profil Pengguna</CardTitle></CardHeader>
            <CardContent>
              <p><strong>Nama:</strong> Pandu Wijaya</p>
              <p><strong>Level:</strong> {Math.floor(points / 100)}</p>
              <p><strong>Poin:</strong> {points}</p>
              <p><strong>Pencapaian:</strong></p>
              <ul className="list-disc pl-5">
                {completedModules.length > 0 ? (
                  completedModules.map((modId) => (
                    <li key={modId}><Award className="inline w-4 h-4 mr-2" /> {modules.find(m => m.id === modId)?.title} Selesai</li>
                  ))
                ) : <li>Belum ada pencapaian</li>}
              </ul>
              <p><strong>Badges:</strong></p>
              <ul className="list-disc pl-5">
                {badges.length > 0 ? (
                  badges.map((badge, index) => (
                    <li key={index}><Medal className="inline w-4 h-4 mr-2" /> {badge}</li>
                  ))
                ) : <li>Belum ada badge</li>}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader><CardTitle>Leaderboard</CardTitle></CardHeader>
            <CardContent>
              {leaderboard.map((entry, index) => (
                <div key={index} className="mb-4">
                  <p><strong>{entry.name}:</strong> {entry.points} poin</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}