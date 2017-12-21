### TUN/TAP
> https://blog.kghost.info/2013/03/27/linux-network-tun/

#### TUN 设备
TUN 设备是一种虚拟网络设备，通过此设备，程序可以方便得模拟网络行为


#### TAP 设备
TAP 设备与 TUN 设备工作方式完全相同，区别在于：

TUN 设备的 /dev/tunX 文件收发的是 IP 层数据包，只能工作在 IP 层，无法与物理网卡做 bridge，但是可以通过三层交换（如 ip_forward）与物理网卡连通。

TAP 设备的 /dev/tapX 文件收发的是 MAC 层数据包，拥有 MAC 层功能，可以与物理网卡做 bridge，支持 MAC 层广播