<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  session_start();

  if ($_SESSION['role'] == 'admin') {
    if (isset($_POST['pupil_id'])) {

      if (isset($_POST['grades'])) {
        $math = $_POST['grades']['math'];
        $polish = $_POST['grades']['polish'];
        $informatics = $_POST['grades']['it'];

        if ($conn->connect_errno !== 0) {
          http_response_code(500);
          echo json_encode(['erorr' => $conn->connect_errno]);
        } else {
          require_once('../connect.php');

          $sql = 'UPDATE `pupils` SET `math`="'.$math.'",`polish`="'.$polish.'",`informatics`="'.$informatics.'" WHERE `id`="'.$_POST['pupil_id'].'"';
          $response = $conn->query($sql);

          if ($response == true) {
            echo json_encode(['Message'] => 'New grades set properly');
          } else {
            echo json_encode(['Error' => 'Something went wrong' ]);
          }
        }

      }

    } else {
      echo json_encode(['Error' => 'Please specify pupil_id' ]);
    }
  } else {
    echo json_encode(['Error' => 'You\'re not an admin' ]);
  }

?>