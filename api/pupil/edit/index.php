<?php
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  session_start();

  $pupil_props = json_decode(file_get_contents("php://input"), true);

  if ($_SESSION['role'] == 'admin') {
    if (!empty($pupil_props['pupil_id'])) {

      if (!empty($pupil_props['grades'])) {
        $math = $pupil_props['grades']['math'];
        $polish = $pupil_props['grades']['polish'];
        $informatics = $pupil_props['grades']['it'];

        require_once('../../../connect.php');

        if ($conn->connect_errno !== 0) {
          http_response_code(500);
          echo json_encode(['erorr' => $conn->connect_errno]);
        } else {

          $sql = 'UPDATE `pupils` SET `math`="'.$math.'",`polish`="'.$polish.'",`informatics`="'.$informatics.'" WHERE `id`='.$pupil_props['pupil_id'];
          $response = $conn->query($sql);

          if ($response == true) {
            echo json_encode(['message' => 'New grades set properly']);
          } else {
            echo json_encode(['error' => 'Something went wrong' ]);
          }
        }

      }

    } else {
      echo json_encode(['error' => 'Please specify pupil_id' ]);
    }
  } else {
    echo json_encode(['error' => 'You\'re not an admin' ]);
  }

?>