<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  session_start();

  if ($_SESSION['role'] == 'admin') {
    if (isset($_POST['pupil'])) {

      $props = json_decode($_POST['pupil'], true);

      require_once('../../connect.php');

      if ($conn->connect_errno !== 0) {
        http_response_code(500);
        echo json_encode(['erorr' => $conn->connect_errno]);
      } else {

        $sql = 'INSERT INTO `pupils`(`name`, `surname`) VALUES ("'.$props['name'].'","'.$props['surname'].'")';

        $response = $conn->query($sql);

        if ($response == true) {
          echo json_encode(['Message'] => 'New grades set properly');
        } else {
          echo json_encode(['Error' => 'Something went wrong' ]);
        }
      }

    } else {
      echo json_encode(['Error' => 'Please specify pupil_id' ]);
    }
  } else {
    echo json_encode(['Error' => 'You\'re not an admin' ]);
  }

?>