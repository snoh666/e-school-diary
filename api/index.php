<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  session_start();

  if (isset($_GET['test'])) {
    echo json_encode([
      'value' => 'Hello api from php',
      'params' => $_GET['test'],
      'username' => $_SESSION['username'],
      'user_role' => $_SESSION['role']
    ]);
  } elseif ($_SESSION['role'] == 'admin') {

    require_once('../connect.php');

    if ($conn->connect_errno !== 0) {
      http_response_code(500);
      echo json_encode(['erorr' => $conn->connect_errno]);
    } else {
      $response = $conn->query('SELECT * FROM pupils');

      $pupils = [];

      while ($row = $response->fetch_assoc()) {
        array_push($pupils, [
          'id' => $row['id'],
          'fullname' => $row['name'].' '.$row['surname'],
          'grades' => [
            'math' => $row['math'],
            'polish' => $row['polish'],
            'it' => $row['informatics']
          ]
          ]);
      }

      echo json_encode($pupils);
    }

  }
?>