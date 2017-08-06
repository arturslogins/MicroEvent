<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-sm-6 col-lg-3">
        <div class="card card-inverse card-primary">
          <div class="card-block pb-0">
            <dropdown class="float-right" type="transparent p-0">
              <i slot="button" class="icon-settings"></i>
              <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Users on Tax System</p>
          </div>
          <TaxSystemChart class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </div>
      </div><!--/.col-->

      <div class="col-sm-6 col-lg-3">
        <div class="card card-inverse card-info">
          <div class="card-block pb-0">
            <dropdown class="float-right" type="transparent p-0">
              <i slot="button" class="icon-settings"></i>
              <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Users on Government sites</p>
          </div>
          <GovernmentChart class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </div>
      </div><!--/.col-->

      <div class="col-sm-6 col-lg-3">
        <div class="card card-inverse card-warning">
          <div class="card-block pb-0">
            <div class="btn-group float-right">
              <dropdown class="float-right" type="transparent p-0">
                <i slot="button" class="icon-settings"></i>
                <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </dropdown>
            </div>
            <h4 class="mb-0">9.823</h4>
            <p>Users on National News Agency</p>
          </div>
          <NationalNewsChart class="chart-wrapper" style="height:70px;" height="70"/>
        </div>
      </div><!--/.col-->

      <div class="col-sm-6 col-lg-3">
        <div class="card card-inverse card-danger">
          <div class="card-block pb-0">
            <div class="btn-group float-right">
              <dropdown class="float-right" type="transparent p-0">
                <i slot="button" class="icon-settings"></i>
                <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </dropdown>
            </div>
            <h4 class="mb-0">9.823</h4>
            <p>Overall Errors</p>
          </div>
          <ErrorsChart class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </div>
      </div><!--/.col-->
    </div><!--/.row-->

    <div class="card">
      <div class="card-block">
        <div class="row">
          <div class="col-sm-5">
            <h4 class="card-title mb-0">Overall Traffic</h4>
            <div class="small text-muted">Today</div>
          </div><!--/.col-->
          <div class="col-sm-7 hidden-sm-down">
            <button type="button" class="btn btn-primary float-right"><i class="icon-cloud-download"></i></button>
            <div class="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
            </div>
          </div><!--/.col-->
        </div><!--/.row-->
        <TrafficChart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"/>
      </div>
      <div class="card-footer">
        <ul>
          <li>
            <div class="text-muted">Visits</div>
            <strong>29.703 Users (40%)</strong>
            <div class="progress progress-xs mt-2">
              <div class="progress-bar bg-success" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </li>
          <li class="hidden-sm-down">
            <div class="text-muted">Unique</div>
            <strong>24.093 Users (20%)</strong>
            <div class="progress progress-xs mt-2">
              <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </li>
          <li>
            <div class="text-muted">Pageviews</div>
            <strong>78.706 Views (60%)</strong>
            <div class="progress progress-xs mt-2">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </li>
          <li class="hidden-sm-down">
            <div class="text-muted">New Users</div>
            <strong>22.123 Users (80%)</strong>
            <div class="progress progress-xs mt-2">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </li>
          <li class="hidden-sm-down">
            <div class="text-muted">Bounce Rate</div>
            <strong>40.15%</strong>
            <div class="progress progress-xs mt-2">
              <div class="progress-bar" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </li>
        </ul>
      </div>
    </div><!--/.card-->

    <div class="row">
      <div class="col-sm-6 col-lg-3">
        <div class="social-box facebook">
          <i class="fa fa-facebook"></i>
          <div class="chart-wrapper">
            <SocialBoxChart :data="[65, 59, 84, 84, 51, 55, 40]" height="90"/>
          </div>
          <ul>
            <li>
              <strong>89k</strong>
              <span>friends</span>
            </li>
            <li>
              <strong>459</strong>
              <span>feeds</span>
            </li>
          </ul>
        </div><!--/.social-box-->
      </div><!--/.col-->

      <div class="col-sm-6 col-lg-3">
        <div class="social-box twitter">
          <i class="fa fa-twitter"></i>
          <div class="chart-wrapper">
            <SocialBoxChart :data="[1, 13, 9, 17, 34, 41, 38]" height="90"/>
          </div>
          <ul>
            <li>
              <strong>973k</strong>
              <span>followers</span>
            </li>
            <li>
              <strong>1.792</strong>
              <span>tweets</span>
            </li>
          </ul>
        </div><!--/.social-box-->
      </div><!--/.col-->

      <div class="col-sm-6 col-lg-3">

        <div class="social-box linkedin">
          <i class="fa fa-linkedin"></i>
          <div class="chart-wrapper">
            <SocialBoxChart :data="[78, 81, 80, 45, 34, 12, 40]" height="90"/>
          </div>
          <ul>
            <li>
              <strong>500+</strong>
              <span>contacts</span>
            </li>
            <li>
              <strong>292</strong>
              <span>feeds</span>
            </li>
          </ul>
        </div><!--/.social-box-->
      </div><!--/.col-->

      <div class="col-sm-6 col-lg-3">
        <div class="social-box google-plus">
          <i class="fa fa-google-plus"></i>
          <div class="chart-wrapper">
            <SocialBoxChart :data="[35, 23, 56, 22, 97, 23, 64]" height="90"/>
          </div>
          <ul>
            <li>
              <strong>894</strong>
              <span>followers</span>
            </li>
            <li>
              <strong>92</strong>
              <span>circles</span>
            </li>
          </ul>
        </div><!--/.social-box-->
      </div><!--/.col-->
    </div><!--/.row-->

  </div>
</template>

<script>
import TaxSystemChart from './dashboard/TaxSystemChart'
import GovernmentChart from './dashboard/GovernmentChart'
import NationalNewsChart from './dashboard/NationalNewsChart'
import ErrorsChart from './dashboard/ErrorsChart'
import TrafficChart from './dashboard/TrafficChart'
import SocialBoxChart from './dashboard/SocialBoxChart'

import { dropdown } from 'vue-strap'

export default {
  name: 'dashboard',
  components: {
    TaxSystemChart,
    GovernmentChart,
    NationalNewsChart,
    ErrorsChart,
    TrafficChart,
    SocialBoxChart,
    dropdown
  },
  data () {
    return {
      interval: null
    }
  },
  created () {
    this.$store.dispatch('fetchStatisticsData')
    this.interval = setInterval(() => {
      this.$store.dispatch('fetchStatisticsData')
    }, 5000)
  },
  destroyed () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>
