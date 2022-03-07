exports.generateHtml = (data) => {
    return `
  <html>
    <head>
      <style>
        table,
        th,
        td {
          border: 1px solid black;
        }
  
        table {
          width: 100%;
        }
  
        th {
          width: 30%;
          text-align: left;
          padding: 10px;
        }
  
        .ln {
            color: red;
        }
  
        td {
          padding-left: 10px;
        }
  
        .img-license {
          width: 500px;
        }
      </style>
    </head>
    <body>
      <h2>Reservation</h2>
  
      <table>
        <tr>
          <th>Reservation ID</th>
          <td class="ln"><b>${data.reservationId}</b></td>
        </tr>
        <tr>
          <th>Total Price</th>
          <td>${data.charges}</td>
        </tr>
          <th>Date of reservation</th>
          <td>${data.reservationDate}</td>
        </tr>
      </table>
    </body>
  </html>
  `;
  };
  