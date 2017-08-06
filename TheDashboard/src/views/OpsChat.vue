<template>
  <div>
    <table class="table table-hover table-outline mb-0">
      <thead class="thead-default">
        <tr>
          <th class="text-center">Country</th>
          <th class="text-center"><i class="icon-people"></i></th>
          <th>User</th>
          <th>Message</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">
            <img src="static/img/flags/USA.png" alt="USA" style="height:24px;">
          </td>
          <td class="text-center">
            <div class="avatar">
              <img src="static/img/avatars/1.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
              <span class="avatar-status badge-success"></span>
            </div>
          </td>
          <td>
            <div>Yiorgos Avraamu</div>
            <div class="small text-muted">
              <span>Ops Ninja</span> | Registered: Jan 1, 2015
            </div>
          </td>
          <td>
            Message
          </td>
          <td>
            <span>2017-08-11T12:11:10Z</span>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <img src="static/img/flags/Brazil.png" alt="Brazil" style="height:24px;">
          </td>
          <td class="text-center">
            <div class="avatar">
              <img src="static/img/avatars/2.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
              <span class="avatar-status badge-danger"></span>
            </div>
          </td>
          <td>
            <div>Avram Tarasios</div>
            <div class="small text-muted">

              <span>Team Lead</span> | Registered: Jan 1, 2015
            </div>
          </td>
          <td>
            Message
          </td>
          <td>
            <span>2017-08-11T12:11:10Z</span>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <img src="static/img/flags/India.png" alt="India" style="height:24px;">
          </td>
          <td class="text-center">
            <div class="avatar">
              <img src="static/img/avatars/3.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
              <span class="avatar-status badge-warning"></span>
            </div>
          </td>
          <td>
            <div>Quintin Ed</div>
            <div class="small text-muted">
              <span>Padawan</span> | Registered: Jan 1, 2015
            </div>
          </td>
          <td>
            Message
          </td>
          <td>
            <span>2017-08-11T12:11:10Z</span>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <img src="static/img/flags/France.png" alt="France" style="height:24px;">
          </td>
          <td class="text-center">
            <div class="avatar">
              <img src="static/img/avatars/4.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
              <span class="avatar-status badge-default"></span>
            </div>
          </td>
          <td>
            <div>Enéas Kwadwo</div>
            <div class="small text-muted">
              <span>Super Jedi</span> | Registered: Jan 1, 2015
            </div>
          </td>
          <td>
            Message
          </td>
          <td>
            <span>2017-08-11T12:11:10Z</span>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <img src="static/img/flags/Spain.png" alt="Spain" style="height:24px;">
          </td>
          <td class="text-center">
            <div class="avatar">
              <img src="static/img/avatars/5.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
              <span class="avatar-status badge-success"></span>
            </div>
          </td>
          <td>
            <div>Agapetus Tadeáš</div>
            <div class="small text-muted">
              <span>Admiral</span> | Registered: Jan 1, 2015
            </div>
          </td>
          <td>
            Message
          </td>
          <td>
            <span>2017-08-11T12:11:10Z</span>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <img src="static/img/flags/Poland.png" alt="Poland" style="height:24px;">
          </td>
          <td class="text-center">
            <div class="avatar">
              <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
              <span class="avatar-status badge-danger"></span>
            </div>
          </td>
          <td>
            <div>Friderik Dávid</div>
            <div class="small text-muted">
              <span>Master of the Ring</span> | Registered: Jan 1, 2015
            </div>
          </td>
          <td>
            Message
          </td>
          <td>
            <span>2017-08-11T12:11:10Z</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="input-prepend input-group">
      <span class="input-group-addon"><i class="fa fa-envelope-o"></i></span>
      <input id="prependedInput" class="form-control" size="16" type="text" placeholder="Send a new message">
      <span class="input-group-btn">
        <button class="btn btn-info" type="button">Send</button>
      </span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
//////////////////////////////////////////////////////
// TODO: Add code to                                //
//   - fetch lastest chat messages (paginated)      //
//   - send messages to the common room             //
//   - notify user of the different message states: //
//     - 202 = Committed locally                    //
//     - 200 = Committed remotely                   //
//////////////////////////////////////////////////////
/* eslint-enable */
export default {
}
</script>
