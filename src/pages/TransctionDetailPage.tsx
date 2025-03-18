import { useParams, Link } from "react-router-dom";
import transactionsData from "../transactions.json";

const TransactionDetailPage = () => {
  const { id } = useParams();
  const transaction = transactionsData.find((tx) => tx.id === parseInt(id!));

  if (!transaction) return <h1>Transaction not found</h1>;

  return (
    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", backgroundColor: "#F5F5F7", }} >
      <Link
        to="/list"
        style={{ marginRight: "350px", fontSize: "40px", 
        textDecoration: "none", color: "#1678c4" }}>
        &lt;
      </Link>
      <h1 style={{ fontSize: "50px", fontWeight: "bold", color: "#000" }}>
        ${Math.abs(transaction.amount).toFixed(2)}
      </h1>
      <h2 style={{ fontSize: "18px", color: "#8E8E93", marginTop: "-5px" }}>
        {transaction.name}
      </h2>
      <p style={{ fontSize: "16px", color: "#8E8E93", marginBottom: "20px" }}>{transaction.date}</p>

      <div style={{ backgroundColor: "#fff",
          borderRadius: "15px",  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          padding: "15px",  width: "320px",  }} >
        <p style={{ fontWeight: "600", color: "#000", textAlign: "left" }}>Status: Approved</p>
        <p style={{ color: "#8E8E93", marginTop: "-5px", marginBottom: "10px", textAlign: "left" }}>
          RBC Bank Debit Card
        </p>

        <hr style={{ border: "0.5px solid #E0E0E0", marginBottom: "10px" }} />

        <p style={{ fontWeight: "600", display: "flex", justifyContent: "space-between" }}>
          Total <span style={{ color: "#000" }}>${Math.abs(transaction.amount).toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
