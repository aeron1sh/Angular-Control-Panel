using Microsoft.AspNet.SignalR;
using System;
using System.Threading;
using System.Web.Hosting;

namespace RealtimeAngular
{
    public class BackgroundTicker : IRegisteredObject
    {
        private Timer taskTimer;
        private IHubContext hub;

        public double bandwidthPct = 20f;
        public double cpuPct = 10f;
        public double salesAmt = 1000f;
        public double alphaSalesAmt = 700f;
        public double betaSalesAmt = 300f;

        public BackgroundTicker()
        {
            HostingEnvironment.RegisterObject(this);

            hub = GlobalHost.ConnectionManager.GetHubContext<MetricHub>();

            taskTimer = new Timer(OnTimerElapsed, null,
                TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(1));
        }

        private void OnTimerElapsed(object sender)
        {
            //hub.Send(DateTime.UtcNow.ToString(), bandwidthPct, cpuPct, salesAmt, alphaAmt, betaAmt);
            hub.Clients.All.broadcastMessage(DateTime.UtcNow.ToString(), bandwidthPct, cpuPct, salesAmt, alphaSalesAmt,
                                            betaSalesAmt);

            // update values
            Random r = new Random();
            bandwidthPct += 15 * r.NextDouble() - 7.5;
            if (bandwidthPct > 100) bandwidthPct = 100;
            if (bandwidthPct < 0) bandwidthPct = 0;

            cpuPct += 15 * r.NextDouble() - 7.5;
            if (cpuPct > 100) cpuPct = 100;
            if (cpuPct < 0) cpuPct = 0;

            alphaSalesAmt += r.NextDouble() * 10;
            if (alphaSalesAmt < 0) alphaSalesAmt = 0;

            betaSalesAmt += r.NextDouble() * 10;
            if (betaSalesAmt < 0) betaSalesAmt = 0;

            salesAmt = alphaSalesAmt + betaSalesAmt;

        }

        public void Stop(bool immediate)
        {
            taskTimer.Dispose();

            HostingEnvironment.UnregisterObject(this);
        }
    }
}