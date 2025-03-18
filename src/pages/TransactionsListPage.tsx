import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import transactionsData from "../transactions.json";
import { Link } from "react-router-dom";

const getSeason = (month: number): string => {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
};

const getSeasonStart = (season: string, year: number): Date => {
  switch (season) {
    case "spring":
      return new Date(`${year}-03-01`);
    case "summer":
      return new Date(`${year}-06-01`);
    case "autumn":
      return new Date(`${year}-09-01`);
    case "winter":
      return new Date(`${year}-12-01`);
    default:
      return new Date(`${year}-01-01`);
  }
};


const calculateDailyPoints = () => {
  const today = new Date();
  const season = getSeason(today.getMonth() + 1);
  const seasonStart = getSeasonStart(season, today.getFullYear());
  const dayOfSeason = Math.floor(
    (today.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;
  
  let points = 2;
  if (dayOfSeason === 2) points = 3;
  else if (dayOfSeason > 2) {
    let prevPoints = 3;
    for (let i = 3; i <= dayOfSeason; i++) {
      points = Math.round(prevPoints + prevPoints * 0.6);
      prevPoints = points;
    }
  }

  return points > 1000 ? `${Math.round(points / 1000)}K` : points;
};


const balance = 17.3;
const limit = 1500;
const available = limit - balance;
const dailyPoints = calculateDailyPoints();


const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; 
const year = today.getFullYear();


const iconMap: { [key: string]: any } = {
  faApple: faApple,
  faShoppingCart: faShoppingCart,
};

const TransactionsListPage = () => {
  


  return (
    <div className="wallet-container" style={{ background: "#efefef", padding: "10px" }}>
      <div style={{ height: "280px" }}>
        <div className="balance-section" style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <div
              className="balance-card" style={{ padding: "2px", background: "white",
                borderRadius: "10px", marginBottom: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", }} >
              <h3 style={{ color: "#555" }}>Card Balance</h3>
              <h1 style={{ color: "#222" }}>${balance.toFixed(2)}</h1>
              <p style={{ color: "#777" }}>${available.toFixed(2)} Available</p>
            </div>

            <div className="daily-points" style={{ padding: "2px", background: "white",
                borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", }} >
              <h3 style={{ color: "#222", marginRight: "40px" }}>Daily Points</h3>
              <h5 style={{ marginRight: "100px", color: "#666" }}>
                {dailyPoints}
              </h5>
            </div>
          </div>

          <div className="payment-status" style={{ flex: 1, padding: "2px", background: "white", borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", justifyContent: "center", }} >
            <h3 style={{ color: "#555" }}>No Payment Due</h3>
            <p style={{ color: "#777" }}>You've paid your September balance.</p>
            <p style={{ textAlign: "right", marginRight: "10px", fontSize: "1.5em", color: "green" }}>✔️</p>
          </div>
        </div>
      </div>

      <h2 style={{ textAlign: "left", margin: "10px 0" }}>Latest Transactions</h2>

      <div className="transactions-list" style={{ backgroundColor: "white", borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)", padding: "10px", }} >
        {transactionsData.map((tx) => (
          <div
            key={tx.id}
            className="transaction-item"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <FontAwesomeIcon icon={iconMap[tx.icon]} size="lg" style={{ color: tx.name === "Apple" ? "#A3AAAE" : "#333", background:"grey", padding: "5px" }} />
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>{tx.name}</p>
                <p style={{ margin: 0, fontSize: "0.9em", color: "#777" }}>{tx.description}</p>
              </div>
            </div>

            <span style={{ fontWeight: "bold"}}>
              {tx.amount < 0 ? `- $${Math.abs(tx.amount).toFixed(2)}` : `$${tx.amount.toFixed(2)}`}
              <Link 
                to={`/detail/${tx.id}`}
                style={{ fontSize: "20px", textDecoration: "none", color: "grey", marginLeft: "10px" }}
              >
                &gt;
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsListPage;
