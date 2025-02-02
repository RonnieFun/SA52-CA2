﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Core2Base.Models;
using Core2Base.Data;
using Microsoft.AspNetCore.Http;
using X.PagedList.Mvc.Core;
using X.PagedList;

namespace Core2Base.Controllers
{
    public class ShoppingCartController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            string UserID = HttpContext.Session.GetString("UserID");
            string SessionID = HttpContext.Session.GetString("sessionid");
            if (UserID != null)
            {
                List<CartDetail> usercart = CartData.GetCartInfo(UserID);
                ViewData["usercart"] = usercart;
                ViewData["qtyInCart"] = CartData.NumberOfCartItems(UserID);

                var pageNumber = 1; // if no page was specified in the querystring, default to the first page (1)
                var onePageOfProducts = usercart.ToPagedList(pageNumber, 3); // will only contain 25 products max because of the pageSize

                ViewBag.OnePageOfProducts = onePageOfProducts;

                ViewData["numberofcartitems"]= CartData.NumberOfCartItems(UserID);
                ViewData["firstname"] = HttpContext.Session.GetString("firstname");
                return View();
            }
            else // TEMP CART
            {
                List<CartDetail> usercart = CartData.GetCartInfoTemp(SessionID);
                ViewData["usercart"] = usercart;
                ViewData["qtyInCart"] = CartData.NumberOfCartItemsTemp(SessionID);

                var pageNumber = 1; // if no page was specified in the querystring, default to the first page (1)
                var onePageOfProducts = usercart.ToPagedList(pageNumber, 3); // will only contain 25 products max because of the pageSize

                ViewBag.OnePageOfProducts = onePageOfProducts;

                ViewData["numberofcartitems"] = CartData.NumberOfCartItemsTemp(SessionID);
                ViewData["firstname"] = HttpContext.Session.GetString("firstname");
                return View();

            }
            return View();
        }

        [HttpPost]
        public JsonResult AddToCart([FromBody] CartDetail productid)
        {
            string UserID = HttpContext.Session.GetString("UserID");
            string sessionid = HttpContext.Session.GetString("sessionid");
            if (UserID != null)
            {
                //add to cart in DB for logged in user
                int success = CartData.AddProductToCart(UserID, productid.ProductId);
                return Json(new { success = true });
            }
            else

            {
                int success = CartData.AddProductToCartTemp(sessionid, productid.ProductId);
            }
            return Json(new { success = true });
        }

        [HttpPost]
        public JsonResult SubtractFromCart([FromBody] CartDetail productid)
        {
            string UserID = HttpContext.Session.GetString("UserID");
            string sessionid = HttpContext.Session.GetString("sessionid");

            List<CartDetail> cartinfo = new List<CartDetail>();

            if (UserID != null) //If Logged in
            {
                cartinfo = CartData.GetCartInfo(UserID);
                var iter = from cartitem in cartinfo where cartitem.ProductId == productid.ProductId select cartitem;
                foreach (var productincart in iter)
                {
                    if (productincart.qty <= 1)
                    {
                        return Json(new { success = false });
                    }
                    else
                    {
                        int success = CartData.SubtractProductFromCart(UserID, productid.ProductId);
                        return Json(new { success = true });
                    }
                }
            }
            else //else if not logged in
            {
                cartinfo = CartData.GetCartInfoTemp(sessionid);
                var iter = from cartitem in cartinfo where cartitem.ProductId == productid.ProductId select cartitem;
                foreach (var productincart in iter)
                {
                    if (productincart.qty <= 1)
                    {
                        return Json(new { success = false });
                    }
                    else
                    {
                        int success = CartData.SubtractProductFromCartTemp(sessionid, productid.ProductId);
                        return Json(new { success = true });
                    }
                }
            }
            return Json(new { success = true });
        }



        [HttpPost]
        public JsonResult EditQuantity([FromBody] CartDetail productid, int quantity)
        {
            string UserID = HttpContext.Session.GetString("UserID");
            string sessionid = HttpContext.Session.GetString("sessionid");
            if (UserID != null)
            { 
                int success = CartData.EditProductQuantity(UserID, productid.ProductId, quantity);                
                return Json(new { success = true });
            }
            else
            {
                int success = CartData.EditProductQuantityTemp(sessionid, productid.ProductId, quantity);
                return Json(new { success = true });
            }
            return Json(new { success = false });
        }


        public JsonResult RemoveFromCart([FromBody] CartDetail productid)
        {
            string UserID = HttpContext.Session.GetString("UserID");
            string session = HttpContext.Session.GetString("sessionid");
            List<CartDetail> cartinfo = new List<CartDetail>();

            if (UserID != null)
            {
                int success = CartData.RemoveProductFromCart(UserID, productid.ProductId);
                return Json(new { success = true });
            }
            else
            {
                int success = CartData.RemoveProductFromCartTemp(session, productid.ProductId);
                return Json(new { success = true });
            }
            
        }
        public IActionResult Direct()
        {
            string UserID = HttpContext.Session.GetString("UserID");
            if (UserID != null)
            {
                return RedirectToAction ("Index","Payment");
            }
            return RedirectToAction ("Login","Home");
        }
    }
}